'use client';

import { useState } from 'react';
import { createCareer, deleteCareer, updateCareer } from '@/app/actions/career';
import { Plus, Trash2, Edit, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function CareerAdminClient({ initialCareers }: { initialCareers: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCareer, setEditingCareer] = useState<any | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreview(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('isActive', 'true');

    // Upload images to Supabase if any
    const uploadedUrls: string[] = [];
    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        const filename = `karir/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from('uploads').upload(filename, file);
        if (!error) {
          const { data } = supabase.storage.from('uploads').getPublicUrl(filename);
          uploadedUrls.push(data.publicUrl);
        }
      }
    }

    // Keep existing images if editing and no new ones uploaded
    if (uploadedUrls.length > 0) {
      formData.set('images', JSON.stringify(uploadedUrls));
    } else if (editingCareer?.images) {
      formData.set('images', editingCareer.images);
    }

    let res;
    if (editingCareer) {
      res = await updateCareer(editingCareer.id, formData);
    } else {
      res = await createCareer(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      setEditingCareer(null);
      setImageFiles([]);
      setImagePreview([]);
      router.refresh();
    } else {
      alert('Error: ' + res.error);
    }
    setIsLoading(false);
  };

  const openEditModal = (career: any) => {
    setEditingCareer(career);
    setImageFiles([]);
    setImagePreview([]);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingCareer(null);
    setImageFiles([]);
    setImagePreview([]);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus lowongan ini?')) return;
    const res = await deleteCareer(id);
    if (res.success) router.refresh();
    else alert('Gagal menghapus: ' + res.error);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Daftar Lowongan Karir</h3>
        <button onClick={openAddModal} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium transition-colors">
          <Plus size={16} className="mr-2" /> Tambah Lowongan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 font-medium">Judul Pekerjaan</th>
              <th className="p-4 font-medium">Gambar</th>
              <th className="p-4 font-medium">Email Tujuan</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {initialCareers.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-gray-500">Belum ada lowongan.</td></tr>
            ) : (
              initialCareers.map((c) => {
                const imgs = JSON.parse(c.images || '[]');
                return (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-800">{c.title}</td>
                    <td className="p-4">
                      {imgs.length > 0 ? (
                        <div className="flex gap-1">
                          {imgs.slice(0, 2).map((url: string, i: number) => (
                            <img key={i} src={url} alt="" className="w-10 h-10 object-cover rounded-lg border border-gray-200" />
                          ))}
                          {imgs.length > 2 && <span className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500">+{imgs.length - 2}</span>}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">–</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-600">{c.emailTo}</td>
                    <td className="p-4 text-right space-x-2 flex justify-end">
                      <button onClick={() => openEditModal(c)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold">{editingCareer ? 'Ubah Lowongan' : 'Tambah Lowongan'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Pekerjaan *</label>
                <input name="title" defaultValue={editingCareer?.title} required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Penerima Lamaran *</label>
                <input name="emailTo" type="email" defaultValue={editingCareer?.emailTo} required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" placeholder="hrd@abahproperty.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
                <textarea name="description" defaultValue={editingCareer?.description} required rows={3} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Persyaratan *</label>
                <textarea name="requirements" defaultValue={editingCareer?.requirements} required rows={3} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" placeholder="Pisahkan dengan enter atau dash" />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2"><ImageIcon size={16} /> Foto / Gambar Lowongan (opsional)</span>
                </label>
                {editingCareer?.images && JSON.parse(editingCareer.images).length > 0 && imagePreview.length === 0 && (
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {JSON.parse(editingCareer.images).map((url: string, i: number) => (
                      <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                    ))}
                    <p className="w-full text-xs text-gray-400 mt-1">Gambar di atas sudah tersimpan. Upload baru untuk menggantinya.</p>
                  </div>
                )}
                {imagePreview.length > 0 && (
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {imagePreview.map((url, i) => <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />)}
                  </div>
                )}
                <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  <Upload size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{imageFiles.length > 0 ? `${imageFiles.length} gambar dipilih` : 'Pilih gambar (bisa lebih dari 1)'}</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">Batal</button>
                <button type="submit" disabled={isLoading} className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
                  {isLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
