'use client';

import { useState } from 'react';
import { ProjectType } from '@prisma/client';
import { createProject, deleteProject, updateProject } from '@/app/actions/project';
import { Plus, Trash2, Edit, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProjectAdminClient({ type, initialProjects }: { type: ProjectType, initialProjects: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('type', type);

    let res;
    if (editingProject) {
      res = await updateProject(editingProject.id, formData);
    } else {
      res = await createProject(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      setEditingProject(null);
      router.refresh();
    } else {
      alert('Error: ' + res.error);
    }
    setIsLoading(false);
  };

  const openEditModal = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    const res = await deleteProject(id);
    if (res.success) {
      router.refresh();
    } else {
      alert('Gagal menghapus: ' + res.error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Daftar Data</h3>
        <button 
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium transition-colors"
        >
          <Plus size={16} className="mr-2" /> Tambah Baru
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 font-medium">Judul</th>
              <th className="p-4 font-medium">Lokasi / Harga</th>
              {type === 'REAL_ESTATE' && <th className="p-4 font-medium">Status</th>}
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {initialProjects.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-gray-500">Belum ada data. Silakan tambah baru.</td></tr>
            ) : (
              initialProjects.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-800">{p.title}</td>
                  <td className="p-4 text-sm text-gray-600">{p.location || '-'} <br/> <span className="text-primary font-medium">{p.price || '-'}</span></td>
                  {type === 'REAL_ESTATE' && <td className="p-4 text-sm text-gray-600">{p.status}</td>}
                  <td className="p-4 text-right space-x-2 flex justify-end">
                    <button onClick={() => openEditModal(p)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
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
              <h3 className="text-xl font-bold">{editingProject ? 'Ubah Data' : 'Tambah Data Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul / Nama Proyek *</label>
                <input name="title" defaultValue={editingProject?.title} required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Opsional)</label>
                  <input name="price" defaultValue={editingProject?.price} placeholder="Misal: Rp 500.000.000" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                  <input name="location" defaultValue={editingProject?.location} placeholder="Misal: Jakarta Selatan" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" />
                </div>
              </div>
              {type === 'REAL_ESTATE' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status Proyek</label>
                  <select name="status" defaultValue={editingProject?.status || 'ONGOING'} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary">
                    <option value="ONGOING">Sedang Berjalan (Ongoing)</option>
                    <option value="COMPLETED">Selesai (Completed)</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Lengkap *</label>
                <textarea name="description" defaultValue={editingProject?.description} required rows={4} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fitur/Spesifikasi (Pisahkan dengan koma)</label>
                <input name="features" defaultValue={editingProject?.features} placeholder="Misal: 3 Kamar Tidur, 2 Kamar Mandi, Taman" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto Proyek {editingProject ? '(Kosongkan jika tidak ingin mengubah)' : '*'}</label>
                <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center flex flex-col items-center">
                  <ImageIcon className="text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500 mb-4">Pilih file gambar untuk diunggah</p>
                  <input type="file" name="images" accept="image/*" required={!editingProject} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Video YouTube (opsional)</label>
                <input
                  name="youtubeUrl"
                  type="url"
                  defaultValue={editingProject?.youtubeUrl || ''}
                  className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-400 mt-1">Tambahkan link YouTube untuk menampilkan video tour properti/proyek ini.</p>
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
