import { getProjects } from '@/app/actions/project';
import ProjectAdminClient from '../real-estate/ProjectAdminClient';

export default async function BrokerAdminPage() {
  const projects = await getProjects('BROKER');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola Broker Properti</h2>
      </div>
      <ProjectAdminClient type="BROKER" initialProjects={projects} />
    </div>
  );
}
