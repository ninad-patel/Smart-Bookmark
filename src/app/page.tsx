'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Bookmark } from '@/types/bookmark';
import Header from '@/components/Header';
import AddBookmarkForm from '@/components/AddBookmarkForm';
import BookmarkCard from '@/components/BookmarkCard';
import {ROUTES, DATABASE, MESSAGES, HEADINGS} from '@/constants';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace(ROUTES.LOGIN);
      } else {
        setSession(session);
      }
      setIsLoading(false);
    };
    init();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace(ROUTES.LOGIN);
      } else {
        setSession(session);
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!session?.user) return;
    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from(DATABASE.TABLES.BOOKMARKS)
        .select('*')
        .order(DATABASE.COLUMNS.CREATED_AT, { ascending: false });

      if (error) {
        console.error(MESSAGES.LOADING, error);
      } else {
        setBookmarks(data || []);
      }
    };

    fetchBookmarks();

    const channel = supabase
      .channel(DATABASE.CHANNELS.BOOKMARKS_CHANGES)
      .on(
        'postgres_changes',
        {
          event: DATABASE.EVENTS.ALL,
          schema: DATABASE.SCHEMA,
          table: DATABASE.TABLES.BOOKMARKS,
          filter: `${DATABASE.COLUMNS.USER_ID}=eq.${session?.user.id}`,
        },
        (payload) => {
          if (payload.eventType === DATABASE.EVENTS.INSERT) {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
          } else if (payload.eventType === DATABASE.EVENTS.DELETE) {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
          } else if (payload.eventType === DATABASE.EVENTS.UPDATE) {
            setBookmarks((prev) =>
              prev.map((b) => (b.id === payload.new.id ? (payload.new as Bookmark) : b))
            );
          }
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user]);

  const handleAddBookmark = async (title: string, url: string) => {
    const { error } = await supabase.from(DATABASE.TABLES.BOOKMARKS).insert([
      {
        title,
        url,
        user_id: session?.user.id,
      },
    ]);
    if (error) {
      throw error;
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    const { error } = await supabase.from(DATABASE.TABLES.BOOKMARKS).delete().eq(DATABASE.COLUMNS.ID, id);
    if (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">{MESSAGES.LOADING}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header userEmail={session.user.email || ''} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <h2 className="mb-4 text-xl font-bold text-gray-800">{HEADINGS.ADD_NEW_BOOKMARK}</h2>
          <AddBookmarkForm onAdd={handleAddBookmark} />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">{HEADINGS.MY_BOOKMARKS}</h2>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
              {bookmarks.length} {bookmarks.length === 1 ? MESSAGES.BOOKMARK_SINGULAR : MESSAGES.BOOKMARK_PLURAL}
            </span>
          </div>

          {bookmarks.length === 0 ? (
            <div className="py-16 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <p className="text-gray-500 text-lg mb-2">{MESSAGES.NO_BOOKMARKS}</p>
              <p className="text-gray-400 text-sm">{MESSAGES.NO_BOOKMARKS_DESCRIPTION}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {bookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onDelete={handleDeleteBookmark}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}