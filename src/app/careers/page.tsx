import { Briefcase, Mail } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function CareersPage() {
  const careers = await prisma.career.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-[family-name:var(--font-outfit)] mb-4">Jenjang Karir</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Mari bergabung dengan tim profesional Abah Property. Kami mencari individu berbakat yang bersemangat di industri properti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Lowongan Tersedia</h2>
            
            {careers.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500">Saat ini belum ada lowongan yang tersedia. Silakan cek kembali nanti.</p>
              </div>
            ) : (
              careers.map((career) => {
                const careerImages = JSON.parse(career.images || '[]');
                return (
                  <div key={career.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
                    {careerImages.length > 0 && (
                      <div className="aspect-video overflow-hidden">
                        <img src={careerImages[0]} alt={career.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-2">{career.title}</h3>
                          <p className="text-text-muted mb-4 whitespace-pre-wrap">{career.requirements}</p>
                        </div>
                        <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                          <Briefcase size={24} />
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 whitespace-pre-wrap">{career.description}</p>
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                        <Mail className="text-secondary mr-3" />
                        <span className="text-sm text-gray-700">Kirim CV ke: <strong>{career.emailTo}</strong></span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-primary text-white p-8 rounded-3xl sticky top-24">
              <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-outfit)]">Mengapa Memilih Kami?</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-secondary mr-3 flex-shrink-0"></div>
                  <span>Lingkungan kerja yang dinamis dan suportif.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-secondary mr-3 flex-shrink-0"></div>
                  <span>Kesempatan pengembangan karir yang jelas.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-secondary mr-3 flex-shrink-0"></div>
                  <span>Kompensasi dan bonus kinerja yang menarik.</span>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-2">Punya pertanyaan seputar karir?</p>
                <p className="font-semibold text-secondary">Hubungi kami melalui WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
