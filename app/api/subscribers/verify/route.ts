import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const { data: subscriber, error } = await supabase
    .from('subscribers')
    .update({ verified: true, verification_token: null })
    .eq('verification_token', token)
    .select()
    .single();

  if (error || !subscriber) {
    return NextResponse.redirect(new URL('/?error=invalid_token', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  }

  return NextResponse.redirect(new URL('/?subscribed=true', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
}
