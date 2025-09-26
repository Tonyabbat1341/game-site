import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('project_id');

  if (!projectId) {
    return new NextResponse('project_id is required', { status: 400 });
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // RLS policy ensures user can only access workflows in their own projects.
  const { data: workflows, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('project_id', projectId);

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(workflows);
}

export async function POST(request: Request) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { name, project_id } = await request.json();

  if (!name || !project_id) {
    return new NextResponse('name and project_id are required', { status: 400 });
  }

  // RLS policy will prevent inserting a workflow into a project the user doesn't own.
  const { data: newWorkflow, error } = await supabase
    .from('workflows')
    .insert({ name, project_id })
    .select()
    .single();

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(newWorkflow);
}
