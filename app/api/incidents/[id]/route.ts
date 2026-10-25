import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status: incidentStatus, update_body } = body;

  const { data: incident } = await supabase
    .from('incidents')
    .select('*, status_pages!inner(user_id, name)')
    .eq('id', id)
    .single();

  if (!incident || (incident.status_pages as any).user_id !== user.id) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
  }

  const updateData: any = {};
  if (incidentStatus) {
    updateData.status = incidentStatus;
    if (incidentStatus === 'resolved') {
      updateData.resolved_at = new Date().toISOString();
    }
  }

  const { data: updatedIncident, error: updateError } = await supabase
    .from('incidents')
    .update(updateData as any)
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  if (update_body || incidentStatus) {
    await supabase.from('incident_updates').insert({
      incident_id: id,
      body: update_body || `Status updated to ${incidentStatus}`,
      status: incidentStatus || incident.status,
    });
  }

  return NextResponse.json(updatedIncident);
}
