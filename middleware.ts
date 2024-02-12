// TODO: Figure out if you can customize the redirect

export { default } from 'next-auth/middleware';

//Add your protected routes
export const config = {
  matcher: ["/chat"],
};