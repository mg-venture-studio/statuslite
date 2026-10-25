import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { status_page_id, title, description, severity, component_ids } = body;

  if (!status_page_id || !title) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data: page } = await supabase
    .from('status_pages')
    .select('id')
    .eq('id', status_page_id)
    .eq('user_id', user.id)
    .single();

  if (!page) {
    return NextResponse.json({ error: 'Status page not found' }, { status: 404 });
  }

  const { data: incident, error: incidentError } = await supabase
    .from('incidents')
    .insert({
      status_page_id,
      title,
      description: description || null,
      severity: severity || 'minor',
      status: 'investigating',
    })
    .select()
    .single();

  if (incidentError) {
    return NextResponse.json({ error: incidentError.message }, { status: 500 });
  }

  if (component_ids && component_ids.length > 0) {
    const incidentComponents = component_ids.map((componentId: string) => ({
      incident_id: incident.id,
      component_id: componentId,
    }));

    await supabase.from('incident_components').insert(incidentComponents);
  }

  await supabase.from('incident_updates').insert({
    incident_id: incident.id,
    body: description || 'Incident reported.',
    status: 'investigating',
  });

  await notifySubscribers(status_page_id, incident);

  return NextResponse.json(incident, { status: 201 });
}

async function notifySubscribers(statusPageId: string, incident: any) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) return;

  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('email')
    .eq('status_page_id', statusPageId)
    .eq('verified', true);

  if (!subscribers || subscribers.length === 0) return;

  const { data: statusPage } = await supabase
    .from('status_pages')
    .select('name')
    .eq('id', statusPageId)
    .single();

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    const emails = subscribers.map((s: any) => s.email);

    await resend.emails.send({
      from: 'StatusLite <notifications@statuslite.app>',
      to: emails,
      subject: `[${statusPage?.name}] Incident: ${incident.title}`,
      html: `
        <h2>${incident.title}</h2>
        <p>${incident.description || 'An incident has been reported.'}</p>
        <p>Severity: ${incident.severity}</p>
        <p>Status: ${incident.status}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          You're receiving this because you subscribed to updates for ${statusPage?.name}.
        </p>
      `,
    });
  } catch (error) {
    console.error('Failed to send notification emails:', error);
  }
}
