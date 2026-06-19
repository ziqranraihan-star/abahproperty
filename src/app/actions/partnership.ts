'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// ===================== LAND SUBMISSION =====================
export async function createLandSubmission(data: {
  ownerName: string;
  phone: string;
  email: string;
  mapsLink?: string;
  landArea: string;
  legality: string;
  cooperationType: string[];
  meetingDate?: string;
  photos?: string[];
}) {
  const submission = await prisma.landSubmission.create({
    data: {
      ownerName: data.ownerName,
      phone: data.phone,
      email: data.email,
      mapsLink: data.mapsLink || null,
      landArea: data.landArea,
      legality: data.legality,
      cooperationType: JSON.stringify(data.cooperationType),
      meetingDate: data.meetingDate || null,
      photos: data.photos ? JSON.stringify(data.photos) : null,
    },
  });

  // Send notification email via mailto approach (stored for admin follow-up)
  // In production, integrate with email service like Resend or Nodemailer
  console.log(`[LAND SUBMISSION] New submission from ${data.ownerName} - ${data.email}`);

  revalidatePath('/admin/kerjasama');
  return { success: true, id: submission.id };
}

export async function getLandSubmissions() {
  return prisma.landSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteLandSubmission(id: string) {
  await prisma.landSubmission.delete({ where: { id } });
  revalidatePath('/admin/kerjasama');
}

// ===================== INVESTMENT SUBMISSION =====================
export async function createInvestmentSubmission(data: {
  ownerName: string;
  phone: string;
  email: string;
  projectInterest: string;
  capitalRange: string;
  cooperationTypes: string[];
  meetingDate?: string;
}) {
  const submission = await prisma.investmentSubmission.create({
    data: {
      ownerName: data.ownerName,
      phone: data.phone,
      email: data.email,
      projectInterest: data.projectInterest,
      capitalRange: data.capitalRange,
      cooperationTypes: JSON.stringify(data.cooperationTypes),
      meetingDate: data.meetingDate || null,
    },
  });

  console.log(`[INVESTMENT SUBMISSION] New submission from ${data.ownerName} - ${data.email}`);

  revalidatePath('/admin/kerjasama');
  return { success: true, id: submission.id };
}

export async function getInvestmentSubmissions() {
  return prisma.investmentSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteInvestmentSubmission(id: string) {
  await prisma.investmentSubmission.delete({ where: { id } });
  revalidatePath('/admin/kerjasama');
}
