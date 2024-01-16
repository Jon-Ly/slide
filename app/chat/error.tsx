'use client'

import {
  ErrorBoundary,
  ErrorBoundaryProps,
} from 'next/dist/client/components/error-boundary';

type ErrorProps = ErrorBoundaryProps & React.PropsWithChildren;

export default function ChatError(props: ErrorProps) {
  const { children, errorComponent } = props;
  return (
    <ErrorBoundary errorComponent={errorComponent}>{children}</ErrorBoundary>
  );
}
