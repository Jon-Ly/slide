'use server';

import { PrismaClient } from '@/generated/prisma-client';
import { Message, PaginatedMessages } from '@/app/types/message';
import { Pagination } from '@/app/types/pagination';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getMessages(
  pagination?: Pagination
): Promise<PaginatedMessages> {
  const { pageNumber, pageSize } = pagination ?? {
    pageNumber: 1,
    pageSize: 20,
  };

  const messages = await prisma.message.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize + 1,
    orderBy: {
      createdAt: 'asc',
    },
  });

  const hasMoreData = messages.length > pageSize;

  return {
    data: messages.slice(0, pageSize),
    hasMoreData,
  };
}

export async function postMessage(
  formData: FormData
): Promise<{ message: Message } | null> {
  const text = formData.get('text')?.toString();

  if (!text?.trim()) {
    return null;
  }

  const message = await prisma.message.create({
    data: {
      text,
      userId: 1,
    },
  });

  revalidatePath('/chat')

  return {
    message,
  };
}
