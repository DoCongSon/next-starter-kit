import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">404</p>
        <h1 className="mt-4 font-[var(--font-fraunces)] text-4xl">Page lost in the archive.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you are looking for has drifted out of this orbit. Head back to the showcase.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
