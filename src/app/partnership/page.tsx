'use client';

import { useState } from 'react';
import { MapPin, Coins, X, Upload, Check, Loader2 } from 'lucide-react';
import { createLandSubmission, createInvestmentSubmission } from '@/app/actions/partnership';
import { supabase } from '@/lib/supabase';

// ---- Land Cooperation Modal ----
function LandModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    ownerName: '', phone: '', email: '', mapsLink: '',
    landArea: '', legality: '', meetingDate: '',
  });
  const [cooperationType, setCooperationType] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const cooperationOptions = [
    'Bagi unit rumah',
    'Bagi hasil penjualan per bidang',
    'Pengelolaan & maintenance',
  ];

  const toggleCoop = (opt: string) => {
    setCooperationType(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooperationType.length === 0) { setError('Pilih minimal satu pola kerjasama.'); return; }
    setUploading(true); setError('');

    try {
      // Upload photos to Supabase
      const photoUrls: string[] = [];
      for (const photo of photos) {
        const filename = `lahan/${Date.now()}-${photo.name}`;
        const { data, error: upErr } = await supabase.storage.from('uploads').upload(filename, photo);
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(filename);
        photoUrls.push(urlData.publicUrl);
      }

      await createLandSubmission({ ...form, cooperationType, photos: photoUrls });
      setSuccess(true);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-primary text-white px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-outfit)]">Penawaran Lahan Kerjasama</h2>
            <p className="text-gray-300 text-sm mt-1">Isi form berikut dan tim kami akan menghubungi Anda</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Terima Kasih!</h3>
            <p className="text-gray-500 mb-6">Penawaran lahan Anda telah kami terima. Tim Abah Property akan segera menghubungi Anda.</p>
            <button onClick={onClose} className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-secondary hover:text-primary transition-colors">
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Pemilik *</label>
                <input required value={form.ownerName} onChange={e => setForm({...form, ownerName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="Nama lengkap" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">No. Telepon / WA *</label>
                <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="08xxxxxxxxxx" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="email@example.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Link Google Maps / ShareLoc</label>
              <input value={form.mapsLink} onChange={e => setForm({...form, mapsLink: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="https://maps.google.com/..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Luas Lahan *</label>
                <input required value={form.landArea} onChange={e => setForm({...form, landArea: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="Contoh: 500 m²" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Legalitas *</label>
                <input required value={form.legality} onChange={e => setForm({...form, legality: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="Contoh: SHM, HGB, dll." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pola Kerjasama * (bisa pilih lebih dari satu)</label>
              <div className="space-y-2">
                {cooperationOptions.map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    <input type="checkbox" checked={cooperationType.includes(opt)} onChange={() => toggleCoop(opt)}
                      className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jadwal Agenda Ketemu</label>
              <input type="datetime-local" value={form.meetingDate} onChange={e => setForm({...form, meetingDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Foto Lahan</label>
              <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                <Upload size={20} className="text-gray-400" />
                <span className="text-sm text-gray-500">{photos.length > 0 ? `${photos.length} foto dipilih` : 'Pilih foto lahan (bisa lebih dari 1)'}</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>

            <button type="submit" disabled={uploading}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-secondary hover:text-primary transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {uploading ? <><Loader2 size={20} className="animate-spin" /> Mengirim...</> : 'Kirim Penawaran'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ---- Investment Modal ----
function InvestmentModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    ownerName: '', phone: '', email: '', projectInterest: '',
    capitalRange: '', meetingDate: '',
  });
  const [cooperationTypes, setCooperationTypes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const coopOptions = ['Modal kerja', 'Pembelian lahan', 'Modal konstruksi'];
  const capitalOptions = [
    'Di bawah Rp 100 juta',
    'Rp 100 juta – Rp 300 juta',
    'Rp 300 juta – Rp 700 juta',
    'Rp 700 juta – Rp 1 miliar',
    'Di atas Rp 1 miliar',
  ];

  const toggleCoop = (opt: string) => {
    setCooperationTypes(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.projectInterest) { setError('Pilih proyek yang diminati.'); return; }
    if (!form.capitalRange) { setError('Pilih rencana nilai modal.'); return; }
    if (cooperationTypes.length === 0) { setError('Pilih minimal satu pola kerjasama.'); return; }
    setSubmitting(true); setError('');

    try {
      await createInvestmentSubmission({ ...form, cooperationTypes });
      setSuccess(true);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="bg-primary text-white px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-outfit)]">Penawaran Permodalan (Investasi)</h2>
            <p className="text-gray-300 text-sm mt-1">Bergabunglah sebagai investor Abah Property</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Terima Kasih!</h3>
            <p className="text-gray-500 mb-6">Penawaran investasi Anda telah kami terima. Manajemen Abah Property akan segera menghubungi Anda untuk presentasi.</p>
            <button onClick={onClose} className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-secondary hover:text-primary transition-colors">
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap *</label>
                <input required value={form.ownerName} onChange={e => setForm({...form, ownerName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="Nama lengkap" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">No. Telepon / WA *</label>
                <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="08xxxxxxxxxx" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="email@example.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Proyek yang Diminati *</label>
              <div className="grid grid-cols-2 gap-3">
                {[{val: 'Proyek on-going', label: 'Proyek On-Going'}, {val: 'Proyek launching', label: 'Proyek Launching'}].map(opt => (
                  <label key={opt.val} className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all ${form.projectInterest === opt.val ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40'}`}>
                    <input type="radio" name="projectInterest" value={opt.val} onChange={e => setForm({...form, projectInterest: e.target.value})}
                      className="w-4 h-4 accent-primary" />
                    <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rencana Nilai Modal *</label>
              <select required value={form.capitalRange} onChange={e => setForm({...form, capitalRange: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-white">
                <option value="">-- Pilih range nilai modal --</option>
                {capitalOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pola Kerjasama * (bisa pilih lebih dari satu)</label>
              <div className="space-y-2">
                {coopOptions.map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    <input type="checkbox" checked={cooperationTypes.includes(opt)} onChange={() => toggleCoop(opt)}
                      className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jadwal Ketemu / Presentasi Manajemen</label>
              <input type="datetime-local" value={form.meetingDate} onChange={e => setForm({...form, meetingDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
            </div>

            <button type="submit" disabled={submitting}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-secondary hover:text-primary transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? <><Loader2 size={20} className="animate-spin" /> Mengirim...</> : 'Kirim Penawaran Investasi'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ---- Main Page ----
export default function PartnershipPage() {
  const [showLandModal, setShowLandModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);

  return (
    <div className="py-12 bg-background min-h-screen">
      {showLandModal && <LandModal onClose={() => setShowLandModal(false)} />}
      {showInvestModal && <InvestmentModal onClose={() => setShowInvestModal(false)} />}

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
              <p className="text-text-muted mb-6 leading-relaxed">
                Apakah Anda memiliki lahan kosong atau lahan tidak produktif di lokasi strategis? Kami siap menjadi mitra pengembang untuk mengolah lahan Anda melalui sistem bagi hasil yang adil dan transparan.
              </p>
              <ul className="space-y-2 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>Bagi unit rumah</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>Bagi hasil penjualan per bidang</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>Pengelolaan & maintenance</li>
              </ul>
              <button
                onClick={() => setShowLandModal(true)}
                className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
              >
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
              <p className="text-text-muted mb-6 leading-relaxed">
                Bergabunglah sebagai investor di proyek-proyek real estate dan renovasi premium kami. Kami menawarkan peluang penanaman modal dengan ROI kompetitif, didukung jaminan aset properti fisik.
              </p>
              <ul className="space-y-2 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>Modal kerja</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>Pembelian lahan</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>Modal konstruksi</li>
              </ul>
              <button
                onClick={() => setShowInvestModal(true)}
                className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
              >
                Info Investasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
