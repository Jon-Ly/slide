import { type PaginatedData } from './paginated-data';
import { Prisma, PrismaClient } from '../../generated/prisma-client';
import { z } from 'zod';

const prisma = new PrismaClient();

// https://github.com/colinhacks/zod/issues/1495#issuecomment-1339832685

export type Message = Prisma.MessageGetPayload<{}>;
export const Message = z.object({
  id: z.number(),
  text: z.string(),
  createdAt: z.date(),
  userId: z.number(),
}) satisfies z.ZodType<Message>;

export type PaginatedMessages = PaginatedData<Message>;
export const PaginatedMessages = z.object({
  data: z.array(Message),
  hasMoreData: z.boolean(),
}) satisfies z.ZodType<PaginatedMessages>;