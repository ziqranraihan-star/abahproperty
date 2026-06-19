'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Briefcase, Hammer, Building2, HeartHandshake, LogOut, Menu, X, Handshake } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Data Proyek (Real Estate)', href: '/admin/real-estate', icon: Building2 },
    { name: 'Data Properti (Broker)', href: '/admin/broker', icon: Home },
    { name: 'Layanan Renovasi', href: '/admin/renovasi', icon: Hammer },
    { name: 'Lowongan Karir', href: '/admin/karir', icon: Briefcase },
    { name: 'Kegiatan CSR', href: '/admin/csr', icon: HeartHandshake },
    { name: 'Pengajuan Kerjasama', href: '/admin/kerjasama', icon: Handshake },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-20 px-6 bg-primary border-b border-white/10">
          <Link href="/admin/dashboard" className="text-xl font-bold tracking-tighter">
            ABAH<span className="text-secondary">ADMIN</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-secondary text-primary' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-primary">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Keluar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm lg:hidden h-20 flex items-center px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-xl font-bold text-primary font-[family-name:var(--font-outfit)]">Dashboard Admin</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
