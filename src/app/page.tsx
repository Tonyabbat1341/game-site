import { createClient } from '@/lib/supabase/server';
import LoginButton from '@/components/LoginButton';
import Dashboard from '@/components/Dashboard';

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen">
      {data.user ? (
        <Dashboard userEmail={data.user.email!} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
          <h1 className="text-4xl font-bold">MyAI Dev Studio</h1>
          <div className="text-center">
            <p className="mb-4">Your all-in-one AI development platform.</p>
            <LoginButton />
          </div>
        </div>
      )}
    </main>
  );
}
