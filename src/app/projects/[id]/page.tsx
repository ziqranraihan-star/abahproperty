import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MapPin, Tag, CheckCircle2, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  const images = JSON.parse(project.images || '[]');
  const coverImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const waMessage = `Halo Abah Property, saya tertarik dengan informasi lengkap mengenai ${project.title}.`;
  const waLink = `https://wa.me/6281234567890?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Image */}
      <div className="w-full h-[60vh] relative">
        <img src={coverImage} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <span className="px-4 py-1.5 text-sm font-bold bg-secondary text-primary rounded-full mb-4 inline-block shadow-md">
              {project.type === 'BROKER' ? 'Broker Properti' : project.type === 'REAL_ESTATE' ? 'Real Estate' : 'Renovasi'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">{project.title}</h1>
            {project.location && (
              <p className="text-gray-300 flex items-center text-lg mt-4">
                <MapPin className="mr-2" size={20} /> {project.location}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6 font-[family-name:var(--font-outfit)]">Deskripsi Proyek</h2>
              <p className="text-text-muted leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>

            {project.features && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 font-[family-name:var(--font-outfit)]">Fitur & Spesifikasi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.split(',').map((f, i) => (
                    <div key={i} className="flex items-center text-text-muted bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <CheckCircle2 className="text-secondary mr-3 flex-shrink-0" size={20} />
                      <span className="font-medium">{f.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {images.length > 1 && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 font-[family-name:var(--font-outfit)]">Galeri Foto</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm">
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* YouTube Video Embed */}
            {project.youtubeUrl && (() => {
              const ytMatch = project.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
              const ytId = ytMatch ? ytMatch[1] : null;
              return ytId ? (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6 font-[family-name:var(--font-outfit)]">Video Tur Properti</h2>
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={project.title}
                    />
                  </div>
                </div>
              ) : null;
            })()}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-6">Ringkasan Info</h3>
              
              <div className="space-y-6 mb-8">
                {project.price && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Harga Properti</p>
                    <p className="text-3xl font-bold text-secondary">{project.price}</p>
                  </div>
                )}
                
                {project.status && (
                  <div className="flex items-center space-x-3">
                    <Tag className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-semibold text-primary">{project.status === 'ONGOING' ? 'Sedang Berjalan' : 'Selesai'}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-8 mt-8">
                <p className="text-sm text-gray-600 mb-4">Tertarik dengan properti ini? Segera hubungi tim marketing kami untuk informasi lebih detail atau survei lokasi.</p>
                <a 
                  href={waLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-4 bg-green-500 text-white font-bold rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
                >
                  <MessageCircle className="mr-2" /> Tanya via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
