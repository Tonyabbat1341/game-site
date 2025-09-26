import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { name } = await request.json();

  if (name.length < 3) {
    return new NextResponse('Project name must be at least 3 characters long', { status: 400 });
  }

  if (!name) {
    return new NextResponse('Project name is required', { status: 400 });
  }

  const { data: newProject, error } = await supabase
    .from('projects')
    .insert({ name, user_id: user.id })
    .select()
    .single();

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(newProject);
}
