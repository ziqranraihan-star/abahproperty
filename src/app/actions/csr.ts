'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { uploadImageToSupabase } from './project';

export async function createCsr(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const youtubeUrl = formData.get('youtubeUrl') as string | null;
    
    // Handle image upload
    const images: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === 'images' && value instanceof File && value.size > 0) {
        const url = await uploadImageToSupabase(value);
        images.push(url);
      }
    }

    const csr = await prisma.csrActivity.create({
      data: {
        title,
        description,
        images: JSON.stringify(images),
        youtubeUrl: youtubeUrl || null,
      },
    });

    revalidatePath('/admin/csr');
    revalidatePath('/csr');
    
    return { success: true, csr };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCsrActivities() {
  return await prisma.csrActivity.findMany({
    orderBy: { date: 'desc' },
  });
}

export async function deleteCsr(id: string) {
  try {
    await prisma.csrActivity.delete({ where: { id } });
    revalidatePath('/admin/csr');
    revalidatePath('/csr');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCsr(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const youtubeUrl = formData.get('youtubeUrl') as string | null;
    
    const existingCsr = await prisma.csrActivity.findUnique({ where: { id } });
    if (!existingCsr) throw new Error('CSR Activity not found');

    let images: string[] = JSON.parse(existingCsr.images);
    
    // Check if new images are uploaded
    let hasNewImages = false;
    for (const [key, value] of formData.entries()) {
      if (key === 'images' && value instanceof File && value.size > 0) {
        hasNewImages = true;
        break;
      }
    }

    if (hasNewImages) {
      images = [];
      for (const [key, value] of formData.entries()) {
        if (key === 'images' && value instanceof File && value.size > 0) {
          const url = await uploadImageToSupabase(value);
          images.push(url);
        }
      }
    }

    const csr = await prisma.csrActivity.update({
      where: { id },
      data: {
        title,
        description,
        images: JSON.stringify(images),
        youtubeUrl: youtubeUrl !== null ? youtubeUrl : undefined,
      },
    });

    revalidatePath('/admin/csr');
    revalidatePath('/csr');
    
    return { success: true, csr };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
