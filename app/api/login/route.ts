import { auth } from 'firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { customInitApp } from '@/app/firebase/admin-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authConfig } from '@/app/firebase/config';

// Init the Firebase SDK every time the server is called
customInitApp();

async function handleBearerToken(authorization: string) {
  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 5 * 60 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);
      return NextResponse.json({}, { status: 200 });
    }
  }
}

async function handleEmailAndPassword(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      authConfig,
      email,
      password
    );

    const user = userCredential.user;
    const authorization = await user.getIdToken();

    if (authorization) {
      const idToken = authorization;
      const decodedToken = await auth().verifyIdToken(idToken);

      if (decodedToken) {
        const expiresIn = 5 * 60 * 1000;
        const sessionCookie = await auth().createSessionCookie(idToken, {
          expiresIn,
        });
        const options = {
          name: 'session',
          value: sessionCookie,
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };

        cookies().set(options);
        return NextResponse.json({ options }, { status: 200 });
      }
    }
  } catch (error: any) {
    console.error('Authentication error:', error);

    let errorMessage = 'Authentication failed';

    // Check Firebase authentication error codes and handle them accordingly
    if (error.code === 'auth/wrong-password') {
      errorMessage = 'Wrong password';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'User not found';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    }

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const formData = await request?.formData();

    const email = formData?.get('email')?.toString();
    const password = formData?.get('password')?.toString();

    if (!email || !password) {
      const authorization = headers().get('Authorization');

      if (!authorization) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      return await handleBearerToken(authorization);
    } else {
      return await handleEmailAndPassword(email, password);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = cookies().get('session')?.value || '';

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}