import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firebaseAdminConfig } from '@/app/firebase/admin-config';
import { Adapter } from 'next-auth/adapters';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? 'ifouhjse9f8useofjk_opgkd0pi9i-=',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return !!profile?.email?.endsWith('@gmail.com');
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  adapter: FirestoreAdapter(firebaseAdminConfig) as Adapter,
  session: {
    strategy: 'jwt',
  }
});

export { handler as GET, handler as POST };
