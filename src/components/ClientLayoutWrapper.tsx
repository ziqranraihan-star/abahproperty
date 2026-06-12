'use client';

import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <SessionProvider>
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? '' : 'flex-grow pt-20'}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </SessionProvider>
  );
}
