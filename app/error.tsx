'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Something broke</p>
        <h1 className="mt-4 font-[var(--font-fraunces)] text-4xl">We lost the thread.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The system hit an unexpected error. Try again and we will reroute the flow.
        </p>
        <Button className="mt-6" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
