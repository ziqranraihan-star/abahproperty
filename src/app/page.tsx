import Link from 'next/link';
import { Home, Hammer, Building2, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const featuredProjects = await prisma.project.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80)' }}
        >
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-[family-name:var(--font-outfit)]">
            Wujudkan <span className="text-secondary">Properti Impian</span> Anda
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-light">
            Partner tepercaya untuk jual beli properti, jasa renovasi premium, dan pengembangan real estate terbaik.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/projects" className="px-8 py-4 bg-secondary text-primary font-bold rounded-full hover-scale transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Lihat Properti
            </Link>
            <Link href="/about" className="px-8 py-4 glass text-white font-semibold rounded-full hover-scale transition-all">
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-[family-name:var(--font-outfit)] mb-4">Layanan Utama Kami</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">Solusi terintegrasi untuk segala kebutuhan properti Anda, dari awal hingga akhir.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Broker */}
            <div className="bg-white dark:bg-primary rounded-2xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-secondary">
                <Home size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Broker Properti</h3>
              <p className="text-text-muted mb-6">
                Kami memasarkan produk-produk properti pilihan dengan harga terbaik dan proses transaksi yang aman & transparan.
              </p>
              <Link href="/projects" className="inline-flex items-center text-secondary font-semibold hover:text-primary transition-colors">
                Selengkapnya <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            {/* Renovation */}
            <div className="bg-white dark:bg-primary rounded-2xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-secondary">
                <Hammer size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Renovasi</h3>
              <p className="text-text-muted mb-6">
                Layanan renovasi interior dan eksterior profesional untuk memberikan nyawa baru pada bangunan lama Anda.
              </p>
              <Link href="/projects" className="inline-flex items-center text-secondary font-semibold hover:text-primary transition-colors">
                Selengkapnya <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            {/* Real Estate */}
            <div className="bg-white dark:bg-primary rounded-2xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-secondary">
                <Building2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Real Estate</h3>
              <p className="text-text-muted mb-6">
                Pengembangan kawasan perumahan dan unit komersial eksklusif dengan fasilitas lengkap dan nilai investasi tinggi.
              </p>
              <Link href="/projects" className="inline-flex items-center text-secondary font-semibold hover:text-primary transition-colors">
                Selengkapnya <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight (Static preview) */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-outfit)] mb-4">Proyek Unggulan</h2>
              <div className="w-24 h-1 bg-secondary mb-4"></div>
              <p className="text-gray-300 max-w-xl">Intip beberapa karya terbaik kami yang telah diserahterimakan maupun yang sedang berjalan.</p>
            </div>
            <Link href="/projects" className="mt-6 md:mt-0 px-6 py-3 border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-primary transition-colors font-medium">
              Lihat Semua Proyek
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => {
              const images = JSON.parse(p.images || '[]');
              const coverImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              
              return (
                <Link href={`/projects/${p.id}`} key={p.id} className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer block">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="inline-block px-3 py-1 bg-secondary text-primary text-xs font-bold rounded-full mb-3">
                      {p.type === 'BROKER' ? 'Broker Properti' : p.type === 'REAL_ESTATE' ? 'Real Estate' : 'Renovasi'}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{p.title}</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                      {p.location ? `${p.location} - ` : ''} {p.price || ''}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6 font-[family-name:var(--font-outfit)]">Punya Lahan atau Modal untuk Dikerjasamakan?</h2>
          <p className="text-lg text-text-muted mb-10">
            Kami membuka peluang kolaborasi dan kemitraan yang saling menguntungkan. Mari tumbuh bersama Abah Property.
          </p>
          <Link href="/partnership" className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-secondary hover:text-primary hover-scale transition-all shadow-lg inline-block">
            Mulai Kerjasama
          </Link>
        </div>
      </section>
    </div>
  );
}
