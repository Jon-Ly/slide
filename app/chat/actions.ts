'use server';

import { PaginatedMessages } from '../types/message';
import { Pagination } from '../types/pagination';

export async function getMessages(
  pagination?: Pagination
): Promise<PaginatedMessages> {
  // const { pagenumber, pagesize } = request;
  // const res = await fetch(`http://localhost:3000/messages?_page=${pagenumber}&_limit=${pagesize}`);
  // const data = await res.json();
  // return {
  //   body: data,
  // };

  return { data: [], hasMoreData: true };
}
