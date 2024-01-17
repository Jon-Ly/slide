'use server';

import { Message, PaginatedMessages } from '../types/message';
import { Pagination } from '../types/pagination';

export async function getMessages(
  pagination?: Pagination
): Promise<PaginatedMessages> {
  const { pageNumber, pageSize } = pagination ?? {
    pageNumber: 1,
    pageSize: 20,
  };

  const url = `${process.env.API_URL}/api/messages?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch messages: ${res.statusText}`
      );
    }

    return PaginatedMessages.parse(await res.json());
  } catch (ex) {
    throw new Error(`Failed to parse messages: ${ex}`);
  }
}

export async function postMessage(formData: FormData): Promise<{message: Message} | null> {
  const url = `${process.env.API_URL}/api/messages`;
  const text = formData.get('text')?.toString();

  if (!text?.trim()) {
    return null;
  }

  const request = {
    text: formData.get('text')?.toString()
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      throw new Error(
        `Failed to post message: ${res.statusText}`
      );
    }

    return await res.json();
  } catch (ex) {
    throw new Error(`Failed to parse message: ${ex}`);
  }
}