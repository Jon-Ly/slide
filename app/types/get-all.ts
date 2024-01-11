import { z } from 'zod';

export default function getAllType<T>(type: z.ZodType<T>) {
  return z.object({
    data: z.array(type),
    hasMoreData: z.boolean(),
  });
}
