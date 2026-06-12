import { getCareers } from '@/app/actions/career';
import CareerAdminClient from './CareerAdminClient';

export default async function CareerAdminPage() {
  const careers = await getCareers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola Lowongan Karir</h2>
      </div>
      <CareerAdminClient initialCareers={careers} />
    </div>
  );
}
