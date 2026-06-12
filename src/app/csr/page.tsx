import { Heart, Home } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function CSRPage() {
  const csrActivities = await prisma.csrActivity.findMany({
    orderBy: { date: 'desc' }
  });

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-[family-name:var(--font-outfit)] mb-4">Kegiatan Sosial (CSR)</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Abah Property percaya bahwa kesuksesan sejati adalah ketika kami mampu memberikan dampak positif dan berbagi kebahagiaan dengan masyarakat sekitar.
          </p>
        </div>

        {/* CSR Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-6">
              <Heart size={40} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4 font-[family-name:var(--font-outfit)]">Bantuan Sosial & Panti Asuhan</h3>
            <p className="text-text-muted">
              Penyaluran sumbangan makanan pokok, dana santunan, dan dukungan operasional kepada lembaga sosial dan panti asuhan secara rutin.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
              <Home size={40} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4 font-[family-name:var(--font-outfit)]">Renovasi Fasilitas Ibadah</h3>
            <p className="text-text-muted">
              Bakti sosial berupa pengerjaan renovasi, perbaikan fisik, hingga pembangunan fasilitas pendukung untuk masjid dan tempat ibadah lainnya.
            </p>
          </div>
        </div>

        {/* CSR Gallery / News Preview */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          
          <h2 className="text-3xl font-bold mb-10 font-[family-name:var(--font-outfit)] relative z-10">Galeri Kegiatan Terbaru</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {csrActivities.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-300">Belum ada galeri kegiatan.</p>
              </div>
            ) : (
              csrActivities.map((csr) => {
                const images = JSON.parse(csr.images || '[]');
                const coverImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1593113589914-07599018edda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                
                return (
                  <div key={csr.id} className="bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 group">
                    <div className="aspect-video bg-gray-300 relative overflow-hidden">
                      <img src={coverImage} alt={csr.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <p className="text-secondary text-sm font-bold mb-2">
                        {new Date(csr.date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                      </p>
                      <h4 className="text-lg font-bold mb-2">{csr.title}</h4>
                      <p className="text-gray-300 text-sm line-clamp-3">{csr.description}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
