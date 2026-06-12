import { getProjects } from '@/app/actions/project';
import ProjectAdminClient from '../real-estate/ProjectAdminClient';

export default async function RenovasiAdminPage() {
  const projects = await getProjects('RENOVATION');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola Proyek Renovasi</h2>
      </div>
      <ProjectAdminClient type="RENOVATION" initialProjects={projects} />
    </div>
  );
}
