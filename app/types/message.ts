import { z } from 'zod';
import getAllType from './get-all';

export const Message = z.object({
  id: z.number(),
  text: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  senderName: z.string(),
});

export const GetAllMessages = getAllType(Message);

export type Message = z.infer<typeof Message>;
export type GetAllMessages = z.infer<typeof GetAllMessages>;
