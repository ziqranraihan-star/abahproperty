'use client';

import { useState } from 'react';
import { createCareer, deleteCareer, updateCareer } from '@/app/actions/career';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CareerAdminClient({ initialCareers }: { initialCareers: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCareer, setEditingCareer] = useState<any | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('isActive', 'true');

    let res;
    if (editingCareer) {
      res = await updateCareer(editingCareer.id, formData);
    } else {
      res = await createCareer(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      setEditingCareer(null);
      router.refresh();
    } else {
      alert('Error: ' + res.error);
    }
    setIsLoading(false);
  };

  const openEditModal = (career: any) => {
    setEditingCareer(career);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingCareer(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus lowongan ini?')) return;
    const res = await deleteCareer(id);
    if (res.success) {
      router.refresh();
    } else {
      alert('Gagal menghapus: ' + res.error);
    }
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
              <th className="p-4 font-medium">Email Tujuan</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {initialCareers.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-gray-500">Belum ada lowongan.</td></tr>
            ) : (
              initialCareers.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-800">{c.title}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold">{editingCareer ? 'Ubah Lowongan' : 'Tambah Lowongan'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
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
                <textarea name="description" defaultValue={editingCareer?.description} required rows={3} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Persyaratan *</label>
                <textarea name="requirements" defaultValue={editingCareer?.requirements} required rows={3} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" placeholder="Pisahkan dengan enter atau dash"></textarea>
              </div>
              <div className="pt-6 flex justify-end space-x-3">
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
