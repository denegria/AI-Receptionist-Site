"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Phone, 
  Mail, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Calls", href: "/dashboard/calls", icon: Phone },
  { name: "Voicemails", href: "/dashboard/voicemails", icon: Mail },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/dashboard/admin");

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      isAdminRoute ? "bg-slate-100/50" : "bg-gray-50"
    )}>
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white px-6 pb-4">
          <div className="flex h-16 items-center justify-between">
            <span className="text-xl font-bold">App Name</span>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-100">
             <Link
                href="/dashboard/admin"
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith("/dashboard/admin")
                    ? "bg-slate-100 text-slate-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <ShieldCheck className="mr-3 h-5 w-5 flex-shrink-0" />
                Admin
              </Link>
              {isAdminRoute && (
                <div className="ml-8 mt-1 space-y-1">
                  <Link
                    href="/dashboard/admin/clients"
                    className={cn(
                      "group flex items-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                      pathname === "/dashboard/admin/clients"
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-slate-500 hover:text-slate-900"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Client Management
                  </Link>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-white lg:pt-5 lg:pb-4">
        <div className="flex h-16 flex-shrink-0 items-center px-6">
          <span className="text-xl font-bold">App Name</span>
        </div>
        <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    pathname === item.href ? "text-gray-900" : "text-gray-400 group-hover:text-gray-500"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t">
             <Link
                href="/dashboard/admin"
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith("/dashboard/admin")
                    ? "bg-slate-200 text-slate-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <ShieldCheck className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  pathname.startsWith("/dashboard/admin") ? "text-slate-900" : "text-gray-400 group-hover:text-gray-500"
                )} />
                Admin
              </Link>
              {isAdminRoute && (
                <div className="ml-8 mt-1 space-y-1">
                  <Link
                    href="/dashboard/admin/clients"
                    className={cn(
                      "group flex items-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                      pathname === "/dashboard/admin/clients"
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    Client Management
                  </Link>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              {isAdminRoute && (
                <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full border border-amber-200 shadow-sm animate-in fade-in slide-in-from-left-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Admin Panel</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
