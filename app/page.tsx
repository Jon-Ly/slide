'use client';

import TextInput from './components/text-input';
import { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginCheck } from './types/login-check';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      fetch('/api/login', {
        method: 'GET',
        signal,
      })
        .then((response) => {
          return response.json();
        })
        .then((response: LoginCheck) => {
          if (response.isLoggedIn && response.user) {
            localStorage.setItem('uid', response.user.uid);
            router.replace('/chat');
          }
        });
    } catch (error) {}

    return () => {
      abortController.abort();
    };
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
