import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Anonymous Supabase client.
 * 
 * USE THIS CLIENT FOR:
 * - Public data queries that do not require a logged-in user.
 * - Operations where RLS policies allow access via the anon key.
 * 
 * FOR AUTHENTICATED QUERIES:
 * - Use the `useSupabase()` hook in client components.
 * - Use `createAuthenticatedSupabaseClient(token)` from `@/lib/supabase-auth` 
 *   when you have a Clerk session token.
 * 
 * Using this anon client for authenticated data will fail RLS checks that 
 * depend on `auth.uid()` or other user-specific claims.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Explicit export of the anonymous client for clarity.
 */
export const supabaseAnon = supabase;
