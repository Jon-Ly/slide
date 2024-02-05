'use client';

import { useEffect, useState } from 'react';
import { getMessages } from './actions';
import ChatForm from './form';
import { PaginatedMessages } from '../types/message';
import { signOut } from 'firebase/auth';
import { authConfig } from '../firebase/config'; 
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const loggedInUser = '1';
  const [messages, setMessages] = useState<PaginatedMessages>();
  const router = useRouter();

  useEffect(() => {
    try {
      fetch('/api/login', {
        method: 'GET',
      })
        .then((response) => {
          return response.json();
        })
        .then((response: { isLoggedIn: boolean }) => {
          if (response.isLoggedIn) {
            getMessages().then((data) => {
              setMessages(data);
            });
          } else {
            router.replace('/');
          }
        });
    } catch (error) {}
  }, [router]);
  
  async function signOutUser() {
    await signOut(authConfig);

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
          if (message.userId === loggedInUser) {
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
