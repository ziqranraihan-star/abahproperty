'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCareer(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const requirements = formData.get('requirements') as string;
    const emailTo = formData.get('emailTo') as string;
    const isActive = formData.get('isActive') === 'true';

    const career = await prisma.career.create({
      data: {
        title,
        description,
        requirements,
        emailTo,
        isActive,
      },
    });

    revalidatePath('/admin/karir');
    revalidatePath('/careers');
    
    return { success: true, career };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCareers() {
  return await prisma.career.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteCareer(id: string) {
  try {
    await prisma.career.delete({ where: { id } });
    revalidatePath('/admin/karir');
    revalidatePath('/careers');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCareer(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const requirements = formData.get('requirements') as string;
    const emailTo = formData.get('emailTo') as string;
    const isActive = formData.get('isActive') === 'true';

    const career = await prisma.career.update({
      where: { id },
      data: {
        title,
        description,
        requirements,
        emailTo,
        isActive,
      },
    });

    revalidatePath('/admin/karir');
    revalidatePath('/careers');
    
    return { success: true, career };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
