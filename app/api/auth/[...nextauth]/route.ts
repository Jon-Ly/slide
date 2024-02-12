import NextAuth, { TokenSet } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firebaseAdminConfig } from '@/app/firebase/admin-config';
import { Adapter } from 'next-auth/adapters';

type JWT = {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  sub?: string;
  exp?: number;
  refresh_token: string;
  expires_at: number;
};

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? 'ifouhjse9f8useofjk_opgkd0pi9i-=',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return !!profile?.email?.endsWith('@gmail.com');
      }
      return false; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, account }) {
      const realToken = token as JWT; // Token has more properties than the default JWT type does
      if (token) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          access_token: token.access_token,
          expires_at: token.expires_at,
          refresh_token: token.refresh_token,
        };
      } else if (Date.now() < realToken.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch('https://oauth2.googleapis.com/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID ?? '',
              client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
              grant_type: 'refresh_token',
              refresh_token: realToken.refresh_token ?? '',
            }),
            method: 'POST',
          });

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...realToken, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: realToken.expires_at,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? realToken.refresh_token,
          };
        } catch (error) {
          console.error('Error refreshing access token', error);
          // The error property will be used client-side to handle the refresh token error
          return { ...realToken, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
  },
  adapter: FirestoreAdapter(firebaseAdminConfig) as Adapter,
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
