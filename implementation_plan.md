# Next.js Minimal Starter Kit — Implementation Plan

Xây dựng một **minimal, production-ready Next.js 16 starter template** tập trung vào nền tảng vững chắc: project config, design system premium, và testing. Template nhẹ, dễ mở rộng — người dùng tự thêm auth, database, payments theo nhu cầu.

## Decisions

| Câu hỏi       | Quyết định                                       |
| ------------- | ------------------------------------------------ |
| Scope         | **Minimal** — core UI system + project structure |
| Auth          | Không bao gồm                                    |
| Payments      | Không bao gồm                                    |
| Multi-tenancy | Không bao gồm                                    |
| AI features   | Không bao gồm                                    |
| Project type  | **Single project** (không monorepo)              |

---

## Tech Stack

| Layer             | Technology                              | Lý do                                          |
| ----------------- | --------------------------------------- | ---------------------------------------------- |
| **Framework**     | Next.js 16 (App Router)                 | Latest stable, Turbopack, RSC                  |
| **Language**      | TypeScript (strict)                     | Type safety                                    |
| **Bundler**       | Turbopack                               | 2-5× faster builds                             |
| **UI Components** | shadcn/ui + Radix UI                    | Accessible, customizable, copy/paste ownership |
| **Styling**       | Tailwind CSS v4                         | CSS-first config, `@theme`, Rust engine        |
| **Animations**    | Framer Motion                           | Micro-interactions, page transitions           |
| **Theme**         | next-themes                             | Dark/light mode, no flash                      |
| **Font**          | next/font (Inter)                       | Zero layout shift                              |
| **Client State**  | Zustand v5                              | ~1.2 KB, hooks-first, persist middleware       |
| **Server State**  | TanStack Query v5                       | Industry standard, cache/mutations/hydration   |
| **Validation**    | Zod + `@t3-oss/env-nextjs`              | Env var safety                                 |
| **Linting**       | ESLint + Prettier + Husky + lint-staged | Code quality                                   |
| **Testing**       | Vitest + Playwright                     | Unit + E2E                                     |

---

## Project Structure

```
nextjs-starter/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Home page (demo/showcase of design system)
│   │   ├── layout.tsx                # Root layout (providers, fonts, metadata)
│   │   ├── globals.css               # Tailwind v4 + @theme + design tokens
│   │   ├── not-found.tsx             # Custom 404
│   │   ├── error.tsx                 # Global error boundary
│   │   ├── loading.tsx               # Global loading state
│   │   ├── sitemap.ts                # Dynamic sitemap
│   │   └── robots.ts                 # Dynamic robots.txt
│   ├── components/
│   │   ├── ui/                       # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── avatar.tsx
│   │   │   └── toast/ (sonner)
│   │   └── shared/
│   │       └── theme-toggle.tsx      # Dark/light mode switch
│   ├── stores/                       # Zustand stores
│   │   ├── use-app-store.ts          # Example: global UI state (sidebar, modals)
│   │   └── index.ts                  # Re-export all stores
│   ├── hooks/
│   │   ├── use-media-query.ts
│   │   ├── use-debounce.ts
│   │   └── queries/                  # TanStack Query hooks
│   │       ├── use-example-query.ts  # Example query hook
│   │       └── keys.ts               # Query key factory
│   ├── lib/
│   │   ├── env.ts                    # Env validation (Zod + @t3-oss/env-nextjs)
│   │   ├── utils.ts                  # cn() utility (clsx + tailwind-merge)
│   │   └── constants.ts              # App-wide constants
│   ├── providers/
│   │   ├── theme-provider.tsx        # next-themes wrapper
│   │   └── query-provider.tsx        # TanStack Query client provider
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript types
│   └── config/
│       └── site.ts                   # Site metadata (title, description, URLs)
├── public/
│   └── images/
├── e2e/                              # Playwright E2E tests
│   └── home.spec.ts
├── __tests__/                        # Vitest unit tests
│   └── utils.test.ts
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .editorconfig
├── .husky/
│   └── pre-commit
├── next.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## Proposed Changes — 3 Phases

### Phase 1: Project Foundation (~30 min)

#### [NEW] Next.js 16 project initialization

- `npx -y create-next-app@latest ./` với TypeScript, Turbopack, App Router, `src/` directory
- Path alias `@/*` → `src/*` trong `tsconfig.json`

#### [NEW] `next.config.ts`

- Turbopack configuration
- Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, CSP)
- Image optimization settings

#### [NEW] `src/lib/env.ts` — Environment validation

- Zod schema validate tất cả env vars tại startup
- Sử dụng `@t3-oss/env-nextjs` cho type-safe env access
- `.env.example` với inline comments cho mọi variable

#### [NEW] Linting & formatting

- ESLint config (Next.js recommended + strict rules)
- Prettier config (singleQuote, semi, trailingComma, printWidth)
- `.editorconfig` cho consistency across editors
- Husky pre-commit hook → lint-staged (eslint --fix + prettier --write)

**Key files:**

- `next.config.ts`, `tsconfig.json`
- `src/lib/env.ts`, `.env.example`
- `.eslintrc.json`, `.prettierrc`, `.editorconfig`
- `.husky/pre-commit`, `package.json` (lint-staged config)

---

### Phase 2: Design System, UI & State Management (~60 min)

#### [NEW] `src/app/globals.css` — Tailwind v4 + Design Tokens

- `@import "tailwindcss"` (v4 syntax)
- `@theme` directive: color palette (HSL), spacing scale, border-radius, shadows, typography
- CSS custom properties cho light/dark mode (background, foreground, muted, accent, destructive, etc.)
- Smooth transition animations cho theme switching
- Base styles: body, headings, links, focus rings

#### [NEW] shadcn/ui setup & components

- Init shadcn/ui: `npx shadcn@latest init`
- Install ~12 core components: Button, Input, Card, Badge, Skeleton, Dialog, DropdownMenu, Sheet, Tabs, Tooltip, Avatar, Sonner (toast)
- Custom color theming theo design tokens

#### [NEW] `src/lib/utils.ts` — Utility functions

- `cn()` function (clsx + tailwind-merge) cho conditional class merging
- Helper functions (formatDate, sleep, etc.)

#### [NEW] `src/providers/theme-provider.tsx` — Dark mode

- `next-themes` ThemeProvider wrapper
- Attribute strategy (`class`) cho Tailwind dark mode
- `disableTransitionOnChange` prevention

#### [NEW] `src/components/shared/theme-toggle.tsx`

- Animated sun/moon toggle button
- Smooth icon transition với Framer Motion
- System / Light / Dark dropdown option

#### [NEW] Typography — `next/font`

- Load Inter font via `next/font/google`
- Apply font variable to `<html>` trong root layout
- Typographic scale defined trong globals.css

#### [NEW] Zustand v5 — Client State Management

- **`src/stores/use-app-store.ts`** — Example store với:
  - UI state (sidebar open/closed, modal visibility)
  - `persist` middleware (localStorage) + `devtools` middleware
  - Hydration tracking (`isHydrated` flag) để tránh SSR mismatch
  - Typed selectors với `useShallow` pattern
- **`src/stores/index.ts`** — Re-export barrel file
- Pattern documentation: cách tạo store mới, slice pattern, khi nào dùng Zustand vs `useState`

```typescript
// Example store pattern
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: true,
        toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      }),
      { name: 'app-store' },
    ),
  ),
);
```

#### [NEW] TanStack Query v5 — Server State Management

- **`src/providers/query-provider.tsx`** — QueryClientProvider wrapper (`"use client"`)
  - Default options: `staleTime`, `gcTime`, `refetchOnWindowFocus`
  - ReactQueryDevtools (dev only)
- **`src/hooks/queries/keys.ts`** — Query key factory pattern
  - Type-safe, hierarchical query keys
  - Hỗ trợ granular invalidation

```typescript
// Query key factory pattern
export const queryKeys = {
  todos: {
    all: ['todos'] as const,
    lists: () => [...queryKeys.todos.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.todos.all, 'detail', id] as const,
  },
};
```

- **`src/hooks/queries/use-example-query.ts`** — Example query hook
  - Demonstrates `useQuery` pattern với type-safe keys
  - Shows `initialData` pattern for RSC → client hydration
  - Inline comments hướng dẫn customization

```typescript
// Example query hook
export function useExampleQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.todos.detail(id),
    queryFn: () => fetchTodo(id),
  });
}
```

#### [NEW] `src/app/layout.tsx` — Root layout

- HTML lang attribute
- Font variable application
- **Provider composition**: ThemeProvider → QueryProvider → children
- Global metadata (title template, description, openGraph, twitter card)
- Sonner toaster component

#### [NEW] `src/app/page.tsx` — Design system showcase

- Demo page hiển thị tất cả UI components
- Color palette swatches
- Typography scale preview
- Button variants, input states, cards
- Dark mode toggle demo
- Micro-animations showcase (Framer Motion)
- **Zustand demo**: interactive counter/toggle sử dụng example store
- **TanStack Query demo**: sample query với loading/error states

#### [NEW] `src/app/not-found.tsx` + `src/app/error.tsx`

- Custom 404 page (styled, animated)
- Global error boundary với retry button

**Key files:**

- `src/app/globals.css` (design tokens)
- `src/components/ui/` (~12 files)
- `src/components/shared/theme-toggle.tsx`
- `src/providers/theme-provider.tsx`
- `src/providers/query-provider.tsx` ← NEW
- `src/stores/use-app-store.ts` ← NEW
- `src/stores/index.ts` ← NEW
- `src/hooks/queries/keys.ts` ← NEW
- `src/hooks/queries/use-example-query.ts` ← NEW
- `src/lib/utils.ts`
- `src/app/layout.tsx`, `src/app/page.tsx`
- `src/app/not-found.tsx`, `src/app/error.tsx`

---

### Phase 3: Testing & Documentation (~30 min)

#### [NEW] Vitest setup

- `vitest.config.ts` với path aliases, jsdom environment
- Sample tests:
  - `__tests__/utils.test.ts` (test cn() và utility functions)
  - `__tests__/stores/app-store.test.ts` (test Zustand store actions)
- Test script trong `package.json`

#### [NEW] Playwright setup

- `playwright.config.ts` (Chromium, webServer integration)
- Sample E2E test: `e2e/home.spec.ts` (page load, theme toggle, component rendering)
- E2E test script trong `package.json`

#### [NEW] SEO files

- `src/app/sitemap.ts` — dynamic sitemap generation
- `src/app/robots.ts` — robots.txt configuration
- `src/config/site.ts` — centralized site metadata

#### [NEW] `README.md`

- Project overview và features
- Quick start (1-command setup): `pnpm install && pnpm dev`
- Environment variables reference
- Project structure diagram
- Customization guide (colors, fonts, components)
- Adding features guide (auth, database, payments — links to recommended libraries)
- Deployment instructions (Vercel one-click + Docker)
- Tech stack table
- License

#### [NEW] Misc docs

- `CONTRIBUTING.md`
- `.env.example` (annotated)

**Key files:**

- `vitest.config.ts`, `playwright.config.ts`
- `__tests__/utils.test.ts`, `__tests__/stores/app-store.test.ts`
- `e2e/home.spec.ts`
- `src/app/sitemap.ts`, `src/app/robots.ts`
- `src/config/site.ts`
- `README.md`, `CONTRIBUTING.md`

---

## Verification Plan

### Automated Tests

```bash
# Type check
pnpm tsc --noEmit

# Lint
pnpm lint

# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Production build
pnpm build
```

### Manual Verification

- [ ] `pnpm dev` khởi động thành công với Turbopack
- [ ] HMR hoạt động (edit file → browser cập nhật instant)
- [ ] Dark/light mode toggle mượt, không flash khi reload
- [ ] Tất cả shadcn/ui components render đúng trên demo page
- [ ] Responsive layout trên mobile/tablet/desktop
- [ ] Framer Motion animations chạy mượt
- [ ] `pnpm build` không errors
- [ ] Lighthouse: Performance > 95, Accessibility > 95, SEO > 95

---

## Timeline

| Phase                                     | Thời gian          | Dependencies |
| ----------------------------------------- | ------------------ | ------------ |
| Phase 1: Foundation                       | ~30 min            | None         |
| Phase 2: Design System + State Management | ~60 min            | Phase 1      |
| Phase 3: Testing & Docs                   | ~30 min            | Phase 2      |
| **Total**                                 | **~2 - 2.5 hours** | —            |
