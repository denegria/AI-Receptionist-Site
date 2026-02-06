import { checkAdminAccess } from '@/lib/admin-allowlist';

export default async function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defense-in-depth: check admin access server-side for all routes in this group
  await checkAdminAccess();

  return <>{children}</>;
}
