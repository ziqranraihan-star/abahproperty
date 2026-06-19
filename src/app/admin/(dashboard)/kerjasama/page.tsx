import { getLandSubmissions, getInvestmentSubmissions, deleteLandSubmission, deleteInvestmentSubmission } from '@/app/actions/partnership';
import { MapPin, Coins, Phone, Mail, Calendar, Trash2 } from 'lucide-react';

export default async function KerjasamaAdminPage() {
  const [landSubmissions, investSubmissions] = await Promise.all([
    getLandSubmissions(),
    getInvestmentSubmissions(),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-primary font-[family-name:var(--font-outfit)]">Pengajuan Kerjasama</h1>
        <p className="text-gray-500 mt-1">Daftar semua form yang telah diisi oleh calon mitra.</p>
      </div>

      {/* Land Submissions */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <MapPin size={20} className="text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-primary">Penawaran Lahan ({landSubmissions.length})</h2>
        </div>

        {landSubmissions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-400">Belum ada pengajuan lahan.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {landSubmissions.map((sub) => {
              const coops = JSON.parse(sub.cooperationType || '[]');
              const photos = JSON.parse(sub.photos || '[]');
              return (
                <div key={sub.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-primary text-lg">{sub.ownerName}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(sub.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                    </div>
                    <form action={async () => { 'use server'; await deleteLandSubmission(sub.id); }}>
                      <button type="submit" className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><Phone size={14} className="text-secondary" /> {sub.phone}</p>
                    <p className="flex items-center gap-2"><Mail size={14} className="text-secondary" /> {sub.email}</p>
                    {sub.meetingDate && <p className="flex items-center gap-2"><Calendar size={14} className="text-secondary" /> Jadwal: {sub.meetingDate}</p>}
                    <p><span className="font-medium text-gray-700">Luas:</span> {sub.landArea}</p>
                    <p><span className="font-medium text-gray-700">Legalitas:</span> {sub.legality}</p>
                    {sub.mapsLink && <a href={sub.mapsLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate block">📍 Lihat Lokasi</a>}
                    <div>
                      <span className="font-medium text-gray-700">Pola Kerjasama:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {coops.map((c: string) => <span key={c} className="px-2 py-0.5 bg-secondary/20 text-primary rounded-full text-xs font-medium">{c}</span>)}
                      </div>
                    </div>
                    {photos.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700">Foto Lahan:</span>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          {photos.map((url: string, i: number) => (
                            <a key={i} href={url} target="_blank" rel="noreferrer">
                              <img src={url} alt={`foto-${i}`} className="w-16 h-16 object-cover rounded-lg border border-gray-200 hover:scale-110 transition-transform" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Investment Submissions */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Coins size={20} className="text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-primary">Penawaran Investasi ({investSubmissions.length})</h2>
        </div>

        {investSubmissions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-400">Belum ada pengajuan investasi.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {investSubmissions.map((sub) => {
              const coops = JSON.parse(sub.cooperationTypes || '[]');
              return (
                <div key={sub.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-primary text-lg">{sub.ownerName}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(sub.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                    </div>
                    <form action={async () => { 'use server'; await deleteInvestmentSubmission(sub.id); }}>
                      <button type="submit" className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><Phone size={14} className="text-secondary" /> {sub.phone}</p>
                    <p className="flex items-center gap-2"><Mail size={14} className="text-secondary" /> {sub.email}</p>
                    {sub.meetingDate && <p className="flex items-center gap-2"><Calendar size={14} className="text-secondary" /> Jadwal: {sub.meetingDate}</p>}
                    <p><span className="font-medium text-gray-700">Proyek Diminati:</span> {sub.projectInterest}</p>
                    <p><span className="font-medium text-gray-700">Range Modal:</span> {sub.capitalRange}</p>
                    <div>
                      <span className="font-medium text-gray-700">Pola Kerjasama:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {coops.map((c: string) => <span key={c} className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">{c}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
