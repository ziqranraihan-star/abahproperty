import { Home, Hammer, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function BusinessPage() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-[family-name:var(--font-outfit)] mb-4">Layanan Bisnis</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Kami menawarkan tiga pilar layanan utama untuk memenuhi segala kebutuhan properti Anda.
          </p>
        </div>

        <div className="space-y-24">
          {/* Real Estate */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-primary text-secondary rounded-xl flex items-center justify-center">
                  <Building2 size={24} />
                </div>
                <h2 className="text-3xl font-bold text-primary font-[family-name:var(--font-outfit)]">Real Estate</h2>
              </div>
              <p className="text-text-muted text-lg leading-relaxed">
                Proyek pengembangan perumahan eksklusif Abah Property. Kami memiliki unit-unit rumah yang sudah selesai dan diserahterimakan, serta proyek yang sedang berjalan dengan konsep desain modern dan ramah lingkungan.
              </p>
              <Link href="/projects" className="inline-block px-6 py-3 bg-secondary text-primary font-semibold rounded-full hover-scale">Lihat Proyek Real Estate</Link>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1613490900233-141c51da8a61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Real Estate" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Renovation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Renovasi" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-primary text-secondary rounded-xl flex items-center justify-center">
                  <Hammer size={24} />
                </div>
                <h2 className="text-3xl font-bold text-primary font-[family-name:var(--font-outfit)]">Renovasi</h2>
              </div>
              <p className="text-text-muted text-lg leading-relaxed">
                Pekerjaan renovasi interior dan eksterior yang ditangani oleh para ahli. Kami siap merombak ruangan lama Anda menjadi desain impian, mulai dari pengecatan, perbaikan atap, pembuatan taman, hingga full makeover interior.
              </p>
              <Link href="/projects" className="inline-block px-6 py-3 bg-secondary text-primary font-semibold rounded-full hover-scale">Konsultasi Renovasi</Link>
            </div>
          </div>

          {/* Broker */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-primary text-secondary rounded-xl flex items-center justify-center">
                  <Home size={24} />
                </div>
                <h2 className="text-3xl font-bold text-primary font-[family-name:var(--font-outfit)]">Broker Properti</h2>
              </div>
              <p className="text-text-muted text-lg leading-relaxed">
                Menghubungkan pembeli dengan properti impian mereka. Kami memiliki daftar lengkap produk-produk properti yang dipasarkan, mulai dari rumah subsidi, cluster mewah, ruko, hingga tanah kosong dengan harga terbaik dan legalitas yang terjamin.
              </p>
              <Link href="/projects" className="inline-block px-6 py-3 bg-secondary text-primary font-semibold rounded-full hover-scale">Lihat Listing Kami</Link>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Broker Properti" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
