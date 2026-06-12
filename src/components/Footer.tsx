import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white mb-6 inline-block">
              ABAH<span className="text-secondary">PROPERTY</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Solusi terpercaya untuk kebutuhan properti Anda. Kami melayani jual beli properti, renovasi interior/eksterior, dan pengembangan real estate dengan standar kualitas premium.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg> {/* TikTok Icon Placeholder */}
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/business" className="text-gray-300 hover:text-white transition-colors">Layanan Bisnis</Link></li>
              <li><Link href="/partnership" className="text-gray-300 hover:text-white transition-colors">Kerjasama & Lahan</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Karir</Link></li>
              <li><Link href="/csr" className="text-gray-300 hover:text-white transition-colors">Kegiatan Sosial (CSR)</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">Layanan Utama</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">Broker Properti</li>
              <li className="text-gray-300">Renovasi Interior</li>
              <li className="text-gray-300">Renovasi Eksterior</li>
              <li className="text-gray-300">Proyek Real Estate</li>
              <li className="text-gray-300">Konsultasi Investasi</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Jl. Contoh Alamat Kantor No. 123, Kota, Provinsi, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-secondary flex-shrink-0" />
                <span className="text-gray-300 text-sm">+62 812 3456 7890 (Admin WA)</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-secondary flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@abahproperty.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Abah Property. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
