'use client';

import TextInput from './components/text-input';
import { FormEvent, useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { authConfig } from './firebase/config';
import { useRouter } from 'next/navigation';

export default function Home({}) {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(authConfig).then(async (userCred) => {
      if (!userCred) {
        return;
      }

      fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.replace('/chat');
        }
      });
    });
  }, [router]);

  async function signInWithEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        router.replace('/chat');
      } else {
        const errorResponse = await res.json();
        console.error(errorResponse);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <main className='grid place-items-center h-full'>
      <section>
        <h1 className='text-center font-bold italic p-4'>Slide</h1>
        <form
          className='m-auto w-96 flex flex-col gap-4'
          onSubmit={signInWithEmail}
        >
          <TextInput label='Email' name='email' type='email' />
          <TextInput label='Password' name='password' type='password' />
          <button
            type='submit'
            className='w-24 m-auto border border-neutral-300 bg-green-300 hover:bg-green-400 rounded-md p-2 text-black font-medium'
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
