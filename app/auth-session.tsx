'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthSession(props: React.PropsWithChildren) {
  return (
    <SessionProvider>
      {props.children}
    </SessionProvider>
  )
}