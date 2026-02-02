import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client with the Clerk session token in the Authorization header.
 * This allows Supabase RLS policies to use `auth.uid()` which is populated by the Clerk JWT.
 * 
 * @param token The JWT session token from Clerk
 * @returns A Supabase client authenticated for the specific user
 */
export const createAuthenticatedSupabaseClient = (token: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};
