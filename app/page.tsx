import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { CounterDemo } from '@/components/shared/counter-demo';
import { QueryDemo } from '@/components/shared/query-demo';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between p-6 lg:px-10">
        <Badge variant="secondary">Arcadia Starter</Badge>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="max-w-3xl space-y-8 pb-12">
          <div className="space-y-6">
            <h1 className="text-balance font-[var(--font-fraunces)] text-5xl leading-tight sm:text-6xl md:text-7xl">
              Nền tảng tối giản. <br className="hidden sm:block" />
              Sẵn sàng cho production.
            </h1>
            <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
              Thiết lập sẵn Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui, Zustand và TanStack
              Query.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Demo Client State (Zustand)
            </h2>
            <CounterDemo />
          </div>

          <div className="space-y-4 pt-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Demo Server State (TanStack Query)
            </h2>
            <QueryDemo />
          </div>
        </div>
      </main>
    </div>
  );
}
