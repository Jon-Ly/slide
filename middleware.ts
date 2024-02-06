import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //Call the authentication endpoint
  const validateTokenResponse = await fetch("http://localhost:3000/api/login", {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  const responseJson = await validateTokenResponse.json();

  //Return to /login if token is not authorized
  if (responseJson.isLoggedIn === false) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ["/chat"],
};