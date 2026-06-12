'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ProjectType, ProjectStatus } from '@prisma/client';
import { supabase } from '@/lib/supabase';

export async function uploadImageToSupabase(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  
  const { data, error } = await supabase
    .storage
    .from('uploads')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false
    });

  if (error) {
    throw new Error(`Gagal mengunggah gambar: ${error.message}`);
  }

  const { data: publicUrlData } = supabase
    .storage
    .from('uploads')
    .getPublicUrl(filename);

  return publicUrlData.publicUrl;
}

export async function createProject(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as ProjectType;
    const status = formData.get('status') as ProjectStatus | null;
    const price = formData.get('price') as string | null;
    const location = formData.get('location') as string | null;
    const features = formData.get('features') as string | null;
    
    // Handle image upload
    const images: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === 'images' && value instanceof File && value.size > 0) {
        const url = await uploadImageToSupabase(value);
        images.push(url);
      }
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        type,
        status: status || null,
        price,
        location,
        features,
        images: JSON.stringify(images),
      },
    });

    revalidatePath('/admin/real-estate');
    revalidatePath('/admin/broker');
    revalidatePath('/admin/renovasi');
    revalidatePath('/projects');
    
    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getProjects(type?: ProjectType) {
  return await prisma.project.findMany({
    where: type ? { type } : undefined,
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath('/admin/real-estate');
    revalidatePath('/admin/broker');
    revalidatePath('/admin/renovasi');
    revalidatePath('/projects');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as ProjectType;
    const status = formData.get('status') as ProjectStatus | null;
    const price = formData.get('price') as string | null;
    const location = formData.get('location') as string | null;
    const features = formData.get('features') as string | null;
    
    const existingProject = await prisma.project.findUnique({ where: { id } });
    if (!existingProject) throw new Error('Project not found');

    let images: string[] = JSON.parse(existingProject.images);
    
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

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        type,
        status: status || null,
        price,
        location,
        features,
        images: JSON.stringify(images),
      },
    });

    revalidatePath('/admin/real-estate');
    revalidatePath('/admin/broker');
    revalidatePath('/admin/renovasi');
    revalidatePath('/projects');
    revalidatePath(`/projects/${id}`);
    
    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
