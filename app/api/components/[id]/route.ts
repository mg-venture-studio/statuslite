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
  const { name, description, status } = body;

  const { data: component } = await supabase
    .from('components')
    .select('*, status_pages!inner(user_id)')
    .eq('id', id)
    .single();

  if (!component || (component.status_pages as any).user_id !== user.id) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 });
  }

  const updateData: any = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;

  const { data: updated, error } = await supabase
    .from('components')
    .update(updateData as any)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const { data: component } = await supabase
    .from('components')
    .select('*, status_pages!inner(user_id)')
    .eq('id', id)
    .single();

  if (!component || (component.status_pages as any).user_id !== user.id) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 });
  }

  const { error } = await supabase
    .from('components')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
