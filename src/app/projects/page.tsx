import { getProjects } from '@/app/actions/project';
import Link from 'next/link';
import { Home, Building2, Hammer } from 'lucide-react';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-[family-name:var(--font-outfit)] mb-4">Daftar Properti & Proyek</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Temukan berbagai pilihan properti eksklusif, real estate, dan hasil karya renovasi terbaik dari Abah Property.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Belum ada proyek atau properti yang ditambahkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => {
              const images = JSON.parse(p.images || '[]');
              const coverImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              
              return (
                <Link href={`/projects/${p.id}`} key={p.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all block">
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <img src={coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold bg-primary text-white rounded-full shadow-md">
                        {p.type === 'BROKER' ? 'Broker Properti' : p.type === 'REAL_ESTATE' ? 'Real Estate' : 'Renovasi'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{p.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      {p.location || 'Lokasi belum ditentukan'}
                    </div>
                    {p.price && <p className="text-secondary font-bold text-lg">{p.price}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
