'use server'

import { auth } from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getUser(): Promise<UserRecord> {
  const session = cookies().get('session')?.value || '';
  
  //Validate if the cookie exist in the request
  if (!session) {
    redirect('/');
  }
  
  //Use Firebase Admin to validate the session cookie
  try {
    const decodedClaims = await auth().verifySessionCookie(session, true);
  
    if (!decodedClaims) {
      cookies().delete('session');
      redirect('/');
    }

    cookies().set('uid', decodedClaims.uid);
    return auth().getUser(decodedClaims.uid);
  } catch (error) {
    // Session likely expired, don't throw error to client
    cookies().delete('session');
    redirect('/');
  }
}