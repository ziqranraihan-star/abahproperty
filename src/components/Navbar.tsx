'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Bisnis', href: '/business' },
    { name: 'Karir', href: '/careers' },
    { name: 'Kolaborasi', href: '/partnership' },
    { name: 'CSR', href: '/csr' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-primary dark:text-white">
              ABAH<span className="text-secondary">PROPERTY</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-secondary font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/6281234567890?text=Halo%20Abah%20Property,%20saya%20ingin%20berkonsultasi."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full bg-secondary text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105"
            >
              Konsultasi Gratis
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-secondary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-20 left-0 w-full bg-background shadow-lg border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-primary/5 hover:text-secondary"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/6281234567890?text=Halo%20Abah%20Property,%20saya%20ingin%20berkonsultasi."
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 mt-4 text-center rounded-md text-base font-bold bg-secondary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
