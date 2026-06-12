import { getCsrActivities } from '@/app/actions/csr';
import CsrAdminClient from './CsrAdminClient';

export default async function CsrAdminPage() {
  const csr = await getCsrActivities();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola Kegiatan CSR</h2>
      </div>
      <CsrAdminClient initialCsr={csr} />
    </div>
  );
}
