'use client';

import {
  ErrorBoundary,
  ErrorBoundaryProps,
} from 'next/dist/client/components/error-boundary';

type ErrorProps = ErrorBoundaryProps & React.PropsWithChildren;

export default function ChatError(props: ErrorProps) {
  const { children, errorComponent } = props;
  return (
    <ErrorBoundary errorComponent={errorComponent}>
      <section className='grid place-items-center h-full'>
        <p className='text-lg'>
          They usually tell you &quot;Something went wrong.&quot; Well...
          <span className='font-bold'> Everything</span> went wrong.
        </p>
      </section>
      {children}
    </ErrorBoundary>
  );
}
