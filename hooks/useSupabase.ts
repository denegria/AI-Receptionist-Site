'use client';

import { useAuth } from '@clerk/nextjs';
import { createAuthenticatedSupabaseClient } from '@/lib/supabase-auth';
import { useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * A React hook that returns an authenticated Supabase client.
 * It uses Clerk's `useAuth()` to retrieve the session token and
 * injects it into the Supabase client headers.
 * 
 * @returns An authenticated Supabase client or null if not loaded/authenticated
 */
export const useSupabase = () => {
  const { getToken, isLoaded, userId } = useAuth();
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const initializeSupabase = async () => {
      if (isLoaded && userId) {
        try {
          // Get the Clerk JWT session token
          const token = await getToken();
          
          if (token) {
            const client = createAuthenticatedSupabaseClient(token);
            setSupabaseClient(client);
          }
        } catch (error) {
          console.error('Error getting Clerk token for Supabase:', error);
          setSupabaseClient(null);
        }
      } else {
        setSupabaseClient(null);
      }
    };

    initializeSupabase();
  }, [isLoaded, userId, getToken]);

  return supabaseClient;
};
