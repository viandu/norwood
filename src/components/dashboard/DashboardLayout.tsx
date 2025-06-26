// src/components/dashboard/DashboardLayout.tsx
'use client';

import { useState, type ReactNode } from 'react';
import { UserSession } from '@/lib/types';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Loader2 } from 'lucide-react';

export default function DashboardLayoutComponent({
  session,
  children,
}: {
  session: UserSession | null;
  children: ReactNode;
}) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!session) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar
        username={session.username}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-y-auto md:ml-64">
        {/* --- THIS IS THE CHANGE --- */}
        {/* Pass the username from the session down to the Header */}
        <Header 
          onMobileMenuClick={() => setMobileSidebarOpen(true)} 
          username={session.username} 
        />
        {/* --- END OF CHANGE --- */}

        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}