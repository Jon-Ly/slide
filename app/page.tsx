import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import SignIn from './sign-in';

export default async function Home() {
  const session = await getServerSession();
  const providers = await getProviders();

  if (session) {
    redirect('/chat');
  }

  if (!providers) {
    return <div>Borked</div>
  }

  return (
    <main className='grid place-items-center h-full'>
      <section>
        <h1 className='text-center font-bold italic p-4'>Slide</h1>
        <SignIn providers={providers} />
      </section>
    </main>
  );
}
