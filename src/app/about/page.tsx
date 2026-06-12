import { Users, Target, ShieldCheck, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-[family-name:var(--font-outfit)] mb-4">Tentang Kami</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Mengenal lebih dekat Abah Property, perjalanan kami, dan dedikasi kami untuk memberikan solusi properti terbaik.
          </p>
        </div>

        {/* Company Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Gedung Kantor Abah Property" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary font-[family-name:var(--font-outfit)]">Profil Perusahaan</h2>
            <p className="text-text-muted leading-relaxed text-lg">
              Didirikan pada tahun <span className="font-bold text-primary">2010</span>, Abah Property telah tumbuh menjadi salah satu agensi dan pengembang properti terkemuka. Berawal dari kecintaan terhadap arsitektur dan kebutuhan hunian berkualitas, kami hadir untuk menjembatani impian Anda dengan realitas.
            </p>
            <p className="text-text-muted leading-relaxed text-lg">
              Kami tidak hanya menjual bangunan, melainkan menciptakan ruang hidup dan investasi jangka panjang yang bernilai tinggi, melalui integritas, transparansi, dan layanan prima.
            </p>
            <div className="pt-4">
              <p className="font-semibold text-primary text-xl">Didirikan Oleh:</p>
              <p className="text-secondary text-2xl font-bold mt-1 font-[family-name:var(--font-outfit)]">Abah Founder</p>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4 font-[family-name:var(--font-outfit)]">Visi Kami</h3>
            <p className="text-text-muted text-lg">
              Menjadi pengembang dan penyedia layanan properti nomor satu yang paling dipercaya dan inovatif di Indonesia, mengutamakan kualitas, estetika, dan kepuasan pelanggan di setiap proyek yang kami sentuh.
            </p>
          </div>
          <div className="bg-primary text-white p-10 rounded-3xl shadow-lg">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-secondary">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-outfit)]">Misi Kami</h3>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li className="flex items-start"><div className="w-2 h-2 mt-2.5 rounded-full bg-secondary mr-3 flex-shrink-0"></div> Memberikan layanan jual beli properti yang aman dan transparan.</li>
              <li className="flex items-start"><div className="w-2 h-2 mt-2.5 rounded-full bg-secondary mr-3 flex-shrink-0"></div> Menghadirkan solusi renovasi interior dan eksterior berkualitas tinggi.</li>
              <li className="flex items-start"><div className="w-2 h-2 mt-2.5 rounded-full bg-secondary mr-3 flex-shrink-0"></div> Mengembangkan kawasan hunian ramah lingkungan dan nyaman.</li>
            </ul>
          </div>
        </div>

        {/* Legalities & Team */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary font-[family-name:var(--font-outfit)] mb-8">Legalitas & Tim Kami</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <Award className="mx-auto text-secondary mb-4" size={48} />
            <h4 className="text-xl font-bold text-primary mb-2">Legalitas Resmi</h4>
            <p className="text-text-muted text-sm">PT Abah Property Nusantara<br/>NIB: 1234567890<br/>Terdaftar resmi di Kemenkumham RI.</p>
          </div>
          <div className="col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <Users className="mx-auto text-secondary mb-4" size={48} />
            <h4 className="text-xl font-bold text-primary mb-2">Tim Profesional</h4>
            <p className="text-text-muted text-sm">Terdiri dari agen bersertifikat, arsitek berpengalaman, dan manajemen proyek yang handal di bidangnya.</p>
          </div>
          <div className="col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/5 text-primary rounded-full mb-4 font-bold text-xl">15+</div>
            <h4 className="text-xl font-bold text-primary mb-2">Tahun Pengalaman</h4>
            <p className="text-text-muted text-sm">Dedikasi lebih dari satu dekade dalam merancang, membangun, dan memasarkan properti terbaik.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
