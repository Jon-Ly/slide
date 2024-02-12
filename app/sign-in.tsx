'use client';

import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';

type SignInProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export default function SignIn({ providers }: SignInProps) {
  return (
    <>
      {Object.values(providers ?? {}).map((provider) => {
        return (
          <button
            type='button'
            onClick={() => signIn(provider.id)}
            key={provider.name}
            className='border p-2 rounded-md w-full text-center bg-gray-200 hover:bg-gray-300 transition-colors duration-300 ease-in-out'
          >
            Sign in with {provider.name}
          </button>
        );
      })}
    </>
  );
}
