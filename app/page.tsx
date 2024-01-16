import { redirect } from 'next/navigation';
import TextInput from './components/text-input';

export default function Home() {
  async function onSubmit(formData: FormData) {
    'use server';

    redirect('/chat');
  }

  return (
    <main className='grid place-items-center h-full'>
      <section>
        <h1 className='text-center font-bold italic p-4'>Slide</h1>
        <form
          className='m-auto w-96 flex flex-col gap-4'
          action={onSubmit}
        >
          <TextInput label='Username' name='username' type='email' />
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
