'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Building2 } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Bisnis', href: '/business' },
    { name: 'Karir', href: '/careers' },
    { name: 'Kolaborasi', href: '/partnership' },
    { name: 'CSR', href: '/csr' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100' : 'bg-background/80 backdrop-blur-md border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:bg-secondary transition-colors duration-300">
                <Building2 size={20} className="text-secondary group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-tighter text-primary font-[family-name:var(--font-outfit)]">
                  ABAH<span className="text-secondary">PROPERTY</span>
                </span>
                <span className="text-[9px] tracking-[0.2em] text-gray-400 uppercase font-medium">Solusi Properti Terpercaya</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-7 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-secondary font-medium transition-colors text-sm relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <a
              href="https://wa.me/6281234567890?text=Halo%20Abah%20Property,%20saya%20ingin%20berkonsultasi."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full bg-secondary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105"
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
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-primary/5 hover:text-secondary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/6281234567890?text=Halo%20Abah%20Property,%20saya%20ingin%20berkonsultasi."
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 mt-3 text-center rounded-lg text-base font-bold bg-secondary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
