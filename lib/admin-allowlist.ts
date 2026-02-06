import { auth, currentUser } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

/**
 * Utility to check if an email is in the admin allowlist.
 * Read from env var `ADMIN_EMAIL_ALLOWLIST` (comma-separated).
 */
export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;

  const allowlistString = process.env.ADMIN_EMAIL_ALLOWLIST || 'alvaro@gmail.com,openclawagent.giuseppe@gmail.com';
  const allowlist = allowlistString.split(',').map((e) => e.trim().toLowerCase());

  return allowlist.includes(email.toLowerCase());
}

/**
 * Server-side check for admin access.
 * To be used in Server Components or Route Handlers for defense-in-depth.
 */
export async function checkAdminAccess() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!isAdminEmail(userEmail)) {
    notFound();
  }
}
