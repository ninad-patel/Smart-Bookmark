'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const {data: { session }} = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
      } else {
        setSession(session);
      }
    };
    init();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <>
      {!session ? (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
          <div className="rounded-xl bg-white p-8 shadow-lg text-center max-w-md w-full">
            <h1 className="mb-2 text-2xl font-bold">
              Dashboard
            </h1>

            <p className="mb-6 text-gray-600 break-all">
              {session?.user.email}
            </p>

            <button
              onClick={() => supabase.auth.signOut()}
              className="rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </main>
      )}
    </>
  );
}