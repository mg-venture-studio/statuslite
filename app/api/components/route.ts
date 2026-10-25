import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { status_page_id, name, description, status } = body;

  if (!status_page_id || !name) {
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

  const { data: component, error } = await supabase
    .from('components')
    .insert({
      status_page_id,
      name,
      description: description || null,
      status: status || 'operational',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(component, { status: 201 });
}
