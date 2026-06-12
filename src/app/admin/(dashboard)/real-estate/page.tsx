import { getProjects, deleteProject } from '@/app/actions/project';
import ProjectAdminClient from './ProjectAdminClient';

export default async function RealEstateAdminPage() {
  const projects = await getProjects('REAL_ESTATE');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola Real Estate</h2>
      </div>
      <ProjectAdminClient type="REAL_ESTATE" initialProjects={projects} />
    </div>
  );
}
