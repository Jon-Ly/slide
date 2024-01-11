import { Message } from '../../types/message';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
) {
  // const { pagenumber, pagesize } = request;
  // const res = await fetch(`http://localhost:3000/messages?_page=${pagenumber}&_limit=${pagesize}`);
  // const data = await res.json();
  // return {
  //   body: data,
  // };

  const mockData: Message[] = [
    {
      createdAt: new Date(2023, 2, 2, 10, 10, 0).toISOString(),
      id: 1,
      senderName: 'Curious George',
      text: 'Hello World',
    },
    {
      createdAt: new Date(2023, 2, 2, 10, 10, 10).toISOString(),
      id: 2,
      senderName: 'Man in Yellow Hat',
      text: 'George, how are you typing?',
    },
    {
      createdAt: new Date(2023, 2, 2, 10, 12, 34).toISOString(),
      id: 3,
      senderName: 'Man in Yellow Hat',
      text: 'Hello?',
    },
    {
      createdAt: new Date(2023, 2, 3, 18, 1, 5).toISOString(),
      id: 4,
      senderName: 'Curious George',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
    },
    {
      createdAt: new Date(2023, 2, 2, 18, 29, 36).toISOString(),
      id: 5,
      senderName: 'Man in Yellow Hat',
      text: 'You found the lorem ipsum feature!',
    },
  ];

  return Response.json({data: mockData, hasMoreData: true});
}
