import { type PaginatedData } from './paginated-data';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

export type Message = Prisma.MessageGetPayload<{}>;
export const Message = z.ZodType<Message>;

export type PaginatedMessages = PaginatedData<Message>;
export const PaginatedMessages = z.ZodType<PaginatedMessages>;
