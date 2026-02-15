'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import {APP_NAME, APP_TAGLINE, ASSETS, IMAGE_SIZES, AUTH_PROVIDERS} from '@/constants';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">
        <div className="mb-6 text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src={ASSETS.LOGO}
              alt={APP_NAME}
              width={IMAGE_SIZES.LOGO_LARGE.width}
              height={IMAGE_SIZES.LOGO_LARGE.height}
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {APP_NAME}
          </h1>
          <p className="text-gray-600 text-sm">
            {APP_TAGLINE}
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[AUTH_PROVIDERS.GOOGLE]}
          onlyThirdPartyProviders={true}
          redirectTo={process.env.NEXT_PUBLIC_SITE_URL}
        />
      </div>
    </div>
  );
}