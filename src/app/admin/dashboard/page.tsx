import { Home, Hammer, Building2, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const brokerCount = await prisma.project.count({ where: { type: 'BROKER' } });
  const realEstateCount = await prisma.project.count({ where: { type: 'REAL_ESTATE' } });
  const renovasiCount = await prisma.project.count({ where: { type: 'RENOVATION' } });
  const careerCount = await prisma.career.count({ where: { isActive: true } });

  const stats = [
    { title: 'Total Properti', value: brokerCount, icon: Home, color: 'bg-blue-100 text-blue-600', href: '/admin/broker' },
    { title: 'Proyek Real Estate', value: realEstateCount, icon: Building2, color: 'bg-indigo-100 text-indigo-600', href: '/admin/real-estate' },
    { title: 'Proyek Renovasi', value: renovasiCount, icon: Hammer, color: 'bg-green-100 text-green-600', href: '/admin/renovasi' },
    { title: 'Lowongan Aktif', value: careerCount, icon: Briefcase, color: 'bg-orange-100 text-orange-600', href: '/admin/karir' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Ringkasan Dashboard</h2>
        <p className="text-gray-500">Selamat datang kembali! Berikut adalah ringkasan data properti Anda.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-secondary"></div>
                <div>
                  <p className="text-sm text-gray-800 font-medium">Properti Baru ditambahkan</p>
                  <p className="text-xs text-gray-500">2 jam yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Panduan Cepat</h3>
          <p className="text-gray-600 text-sm mb-4">Gunakan navigasi di sebelah kiri untuk mengelola masing-masing bagian dari website Anda. Anda dapat menambah, mengedit, dan menghapus data properti yang akan langsung tampil di website utama.</p>
          <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
            <strong>Tip:</strong> Pastikan mengunggah foto dengan resolusi tinggi dan ukuran yang telah dikompresi agar loading website tetap cepat.
          </div>
        </div>
      </div>
    </div>
  );
}
