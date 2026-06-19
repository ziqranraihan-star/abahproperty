'use client';

import { useState } from 'react';
import { createCsr, deleteCsr, updateCsr } from '@/app/actions/csr';
import { Plus, Trash2, Edit, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CsrAdminClient({ initialCsr }: { initialCsr: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCsr, setEditingCsr] = useState<any | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    let res;
    if (editingCsr) {
      res = await updateCsr(editingCsr.id, formData);
    } else {
      res = await createCsr(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      setEditingCsr(null);
      router.refresh();
    } else {
      alert('Error: ' + res.error);
    }
    setIsLoading(false);
  };

  const openEditModal = (csr: any) => {
    setEditingCsr(csr);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingCsr(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus kegiatan ini?')) return;
    const res = await deleteCsr(id);
    if (res.success) {
      router.refresh();
    } else {
      alert('Gagal menghapus: ' + res.error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Daftar Galeri CSR</h3>
        <button onClick={openAddModal} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium transition-colors">
          <Plus size={16} className="mr-2" /> Tambah Kegiatan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 font-medium">Judul Kegiatan</th>
              <th className="p-4 font-medium">Tanggal Dibuat</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {initialCsr.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-gray-500">Belum ada galeri CSR.</td></tr>
            ) : (
              initialCsr.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-800">{c.title}</td>
                  <td className="p-4 text-sm text-gray-600">{new Date(c.date).toLocaleDateString('id-ID')}</td>
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
              <h3 className="text-xl font-bold">{editingCsr ? 'Ubah Galeri CSR' : 'Tambah Galeri CSR'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kegiatan *</label>
                <input name="title" defaultValue={editingCsr?.title} required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Cerita *</label>
                <textarea name="description" defaultValue={editingCsr?.description} required rows={3} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unggah Foto {editingCsr ? '(Kosongkan jika tidak ingin mengubah)' : '*'}</label>
                <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center flex flex-col items-center">
                  <ImageIcon className="text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500 mb-4">Pilih foto galeri</p>
                  <input type="file" name="images" accept="image/*" required={!editingCsr} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Video YouTube (opsional)</label>
                <input
                  name="youtubeUrl"
                  type="url"
                  defaultValue={editingCsr?.youtubeUrl || ''}
                  className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-400 mt-1">Masukkan link YouTube lengkap jika kegiatan ini memiliki video dokumentasi.</p>
              </div>
              <div className="pt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">Batal</button>
                <button type="submit" disabled={isLoading} className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
                  {isLoading ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
