'use client';

import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaginatedMessages } from '../types/message';
import ChatForm from './form';

export default function ChatPage() {
  const [uid, setUid] = useState<string>('');
  const [messages, setMessages] = useState<PaginatedMessages>();
  const router = useRouter();
  const session = useSession();
  
  if (!session) {
    router.replace('/');
  }
  
  async function signOutUser() {
    await signOut({redirect: true});

    const response = await fetch("http://localhost:3000/api/signout", {
      method: "POST",
    });

    if (response.status === 200) {
      router.push("/");
    }
  }

  return (
    <main className='m-auto w-[70%] h-full flex flex-col justify-end'>
      <header>
        <button onClick={signOutUser}>Sign out</button>
      </header>
      <section className='flex flex-col gap-2 overflow-y-auto px-2 py-4'>
        {!messages && <div>Start chatting!</div>}
        {messages?.data.map((message) => {
          if (message.userId === uid) {
            return (
              <div
                className='bg-red-200 max-w-96 w-fit p-2 self-end'
                key={message.id}
              >
                <p>{message.text}</p>
              </div>
            );
          } else {
            return (
              <div className='bg-blue-200 max-w-96 w-fit p-2' key={message.id}>
                {message.text}
              </div>
            );
          }
        })}
      </section>
      <ChatForm />
    </main>
  );
}
