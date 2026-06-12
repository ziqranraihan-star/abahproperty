import { MapPin, Coins } from 'lucide-react';

export default function PartnershipPage() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-[family-name:var(--font-outfit)] mb-4">Kolaborasi & Kerjasama</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Abah Property terbuka untuk berbagai bentuk kerjasama yang saling menguntungkan. Mari bersinergi membangun nilai properti yang maksimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Lahan */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
            <div className="h-48 bg-primary relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute -bottom-10 left-8 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                <MapPin size={40} className="text-primary" />
              </div>
            </div>
            <div className="p-8 pt-16">
              <h2 className="text-2xl font-bold text-primary mb-4 font-[family-name:var(--font-outfit)]">Penawaran Lahan Kerjasama</h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Apakah Anda memiliki lahan kosong atau lahan tidak produktif di lokasi strategis? Kami siap menjadi mitra pengembang untuk mengolah lahan Anda menjadi kawasan perumahan atau komersial yang bernilai jual tinggi melalui sistem bagi hasil yang adil dan transparan.
              </p>
              <button className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors">
                Tawarkan Lahan Anda
              </button>
            </div>
          </div>

          {/* Modal */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
            <div className="h-48 bg-primary relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute -bottom-10 left-8 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                <Coins size={40} className="text-primary" />
              </div>
            </div>
            <div className="p-8 pt-16">
              <h2 className="text-2xl font-bold text-primary mb-4 font-[family-name:var(--font-outfit)]">Penawaran Permodalan (Investasi)</h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Bergabunglah sebagai investor di proyek-proyek real estate dan renovasi premium kami. Kami menawarkan peluang penanaman modal dengan tingkat pengembalian (ROI) yang kompetitif, didukung oleh studi kelayakan dan jaminan aset properti fisik.
              </p>
              <button className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors">
                Info Investasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
