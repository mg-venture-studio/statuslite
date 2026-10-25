import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { status_page_id, email } = body;

  if (!status_page_id || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data: page } = await supabase
    .from('status_pages')
    .select('id, name')
    .eq('id', status_page_id)
    .single();

  if (!page) {
    return NextResponse.json({ error: 'Status page not found' }, { status: 404 });
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');

  const { data: subscriber, error } = await supabase
    .from('subscribers')
    .insert({
      status_page_id,
      email,
      verified: false,
      verification_token: verificationToken,
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await sendVerificationEmail(email, verificationToken, page.name);

  return NextResponse.json(subscriber, { status: 201 });
}

async function sendVerificationEmail(email: string, token: string, pageName: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const verifyUrl = `${siteUrl}/api/subscribers/verify?token=${token}`;

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'StatusLite <noreply@statuslite.app>',
      to: email,
      subject: `Verify your subscription to ${pageName}`,
      html: `
        <h2>Verify your subscription</h2>
        <p>Click the link below to verify your email and receive incident updates for ${pageName}.</p>
        <a href="${verifyUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
          Verify Email
        </a>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          If you didn't subscribe, you can ignore this email.
        </p>
      `,
    });
  } catch (error) {
    console.error('Failed to send verification email:', error);
  }
}
