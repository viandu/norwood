// src/components/LayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define the routes where you DON'T want the public Navbar and Footer
  const isDashboardRoute = pathname.startsWith('/dashboard');

  // If it's a dashboard route, render only the children (which will be the DashboardLayout)
  if (isDashboardRoute) {
    return <>{children}</>;
  }

  // Otherwise, for all public routes, render the Navbar, children, and Footer
  return (
    <>
      <Navbar session={null} />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}