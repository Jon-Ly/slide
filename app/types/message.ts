import { type PaginatedData } from './paginated-data';
import { Prisma, PrismaClient } from '../../generated/prisma-client';
import { z } from 'zod';

// https://github.com/colinhacks/zod/issues/1495#issuecomment-1339832685

export type Message = Prisma.MessageGetPayload<{}>;
export const Message = z.object({
  id: z.number(),
  text: z.string(),
  createdAt: z.coerce.date(), // forces any value to be passed through new Date()
  userId: z.string(),
}) satisfies z.ZodType<Message>;

export type PaginatedMessages = PaginatedData<Message>;
export const PaginatedMessages = z.object({
  data: z.array(Message),
  hasMoreData: z.boolean(),
}) satisfies z.ZodType<PaginatedMessages>;