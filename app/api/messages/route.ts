import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma-client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageNumber = +(searchParams.get('pageNumber') ?? 1);
  const pageSize = +(searchParams.get('pageSize') ?? 20);

  try {
    const messages = await prisma.message.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize + 1,
      orderBy: {
        createdAt: 'desc',
      },
    });
  
    const hasMoreData = messages.length > pageSize;
  
    return NextResponse.json({
      data: messages.slice(0, pageSize),
      hasMoreData,
    });
  } catch (ex) {
    // Log error
    console.error(ex);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  const { text } = await req.json();

  const message = await prisma.message.create({
    data: {
      text,
      userId: 1,
    },
  });

  return NextResponse.json({
    data: message,
  });
}
