# 🏛️ Arcadia Starter — Next.js 16 Starter Kit

Một starter template **Next.js 16 (App Router)** tối giản, sẵn sàng cho môi trường production. Dự án được thiết lập bài bản dựa trên ba trụ cột cốt lõi: **Kiến trúc bền vững (Robust Architecture)**, **Hệ thống thiết kế cao cấp (Premium Design System)**, và **Hạ tầng kiểm thử tin cậy (Solid Testing Infrastructure)**.

---

## 🚀 Tính Năng Nổi Bật (Key Features)

### 1. Kiến Trúc Server-First & Tối Ưu Hiệu Năng

- **React Server Components (RSC)**: 100% các trang và bố cục tĩnh được xử lý ở phía server để tối ưu hóa SEO và giảm tải dung lượng client bundle.
- **Turbopack**: Trình biên dịch siêu tốc bằng Rust, tăng tốc thời gian hot reload từ 2 - 5 lần.
- **Dynamic Sitemap & Robots**: Tự động sinh tệp lập chỉ mục hỗ trợ tốt nhất cho công cụ tìm kiếm.

### 2. Quản Lý State Mô-đun Hoá

- **Client State (Zustand v5)**: Hệ thống store phân rã thành các module nhỏ gọn (UI, Nghiệp vụ) tránh gây re-render diện rộng, hỗ trợ lưu trữ cục bộ (`persist`) và giải quyết hoàn toàn lỗi Hydration mismatch.
- **Server State (TanStack Query v5)**: Quản lý cache và đồng bộ dữ liệu API tập trung thông qua mô hình **Query Key Factory** cùng khả năng nạp trước dữ liệu (`prefetch`) từ máy chủ mượt mà.

### 3. Giao Diện Premium & CSS-First

- **Tailwind CSS v4**: Cấu hình hệ thống thiết kế tập trung trực tiếp trong CSS (`@theme inline`) mà không cần tệp cấu hình cồng kềnh.
- **Arcadia Theme**: Phối màu nghệ thuật (Warm & Dark themes) dịu mắt kết hợp với các hiệu ứng chuyển động vi mô (micro-animations) mượt mà bởi `Framer Motion`.
- **shadcn/ui**: Thiết lập sẵn aliases đường dẫn nhập khẩu cấu trúc, dễ dàng mở rộng qua CLI.

### 4. Hạ Tầng Kiểm Thử & An Toàn Kiểu Dữ Liệu

- **Type-Safe Env**: Kiểm soát chặt chẽ các biến môi trường ở cả server-side và client-side bằng `Zod` và `@t3-oss/env-nextjs`.
- **Testing Suite**: Cấu hình sẵn **Vitest** để chạy unit test tốc độ cao và **Playwright** để kiểm thử giao diện thực tế (E2E).
- **Git Hooks tự động**: Sử dụng **Husky v9** kết hợp với **lint-staged** tự động format và kiểm tra lỗi code (ESLint & Prettier) trước mỗi lần commit.

---

## 📂 Cấu Trúc Thư Mục Dự Án (Directory Structure)

```text
next-starter-kit/
├── .husky/                  # Các cấu hình Git Hooks tự động hóa (pre-commit)
├── __tests__/               # Thư mục chứa Unit Tests (Vitest)
│   ├── stores/              # Kiểm thử hành vi lưu trữ của Zustand stores
│   └── utils.test.ts        # Kiểm thử các hàm tiện ích
├── app/                     # Next.js App Router (100% Server Components mặc định)
│   ├── error.tsx            # Bẫy lỗi toàn cục (Global Error Boundary)
│   ├── globals.css          # Điểm khai báo Tailwind v4 & Design Tokens
│   ├── layout.tsx           # Bố cục gốc (Compose các Providers, Fonts & Toaster)
│   ├── page.tsx             # Trang chủ (Server-rendered tĩnh và sạch sẽ)
│   ├── robots.ts            # Tự động tạo robots.txt
│   └── sitemap.ts           # Tự động tạo sitemap.xml
├── components/              # Các thành phần giao diện
│   ├── ui/                  # Các thành phần nguyên tử cấu trúc shadcn/ui
│   └── shared/              # Thành phần dùng chung (ThemeToggle, CounterDemo...)
├── config/                  # Các cấu hình tĩnh cấp hệ thống (Site Metadata)
├── e2e/                     # Thư mục chứa End-to-End Tests (Playwright)
├── hooks/                   # Các React Hooks tự chế cấp hệ thống
│   └── queries/             # Chứa custom queries hooks (TanStack Query) và Key Factory
├── lib/                     # Thư viện và tiện ích dùng chung
│   ├── env.ts               # Khai báo và validate biến môi trường chặt chẽ bằng Zod
│   └── utils.ts             # Hàm tiện ích ghép class (cn) và định dạng dữ liệu
├── providers/               # Các nhà cung cấp ngữ cảnh toàn cục (Theme, Query)
├── stores/                  # Quản lý State phân rã (Zustand Stores)
│   ├── use-counter-store.ts # Store độc lập quản lý nghiệp vụ số đếm
│   ├── use-ui-store.ts      # Store độc lập quản lý giao diện & hydration
│   └── index.ts             # Điểm tập trung export của toàn bộ stores
└── package.json             # Khai báo thư viện và câu lệnh thực thi (scripts)
```

---

## 🛠️ Hướng Dẫn Khởi Đầu Nhanh (Quick Start)

### 1. Cài đặt Dependencies

```bash
npm install
```

_(Lưu ý: Nếu chạy E2E tests lần đầu, hãy cài đặt trình duyệt của Playwright bằng lệnh `npx playwright install`)_

### 2. Cấu hình biến môi trường

Tạo tệp cấu hình cá nhân dựa trên bản mẫu `.env.example`:

```bash
cp .env.example .env.local
```

### 3. Khởi chạy máy chủ phát triển

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để kiểm tra kết quả hiển thị.

### 4. Các câu lệnh phát triển (Developer Scripts)

| Câu lệnh           | Mục đích                                 | Công nghệ sử dụng         |
| ------------------ | ---------------------------------------- | ------------------------- |
| `npm run dev`      | Khởi động server môi trường local        | Next.js + Turbopack       |
| `npm run build`    | Biên dịch tối ưu mã nguồn cho Production | Next.js compiler          |
| `npm run start`    | Chạy ứng dụng từ bản build tối ưu        | Node.js production server |
| `npm run lint`     | Rà soát lỗi cú pháp và kiểu dữ liệu      | ESLint                    |
| `npm run format`   | Tự động định dạng toàn bộ mã nguồn       | Prettier                  |
| `npm run test`     | Chạy toàn bộ Unit Tests                  | Vitest                    |
| `npm run test:e2e` | Chạy toàn bộ kiểm thử giao diện thực tế  | Playwright                |

---

## 📘 Hướng Dẫn Phát Triển & Chuẩn Kiến Trúc (Architecture & Guidelines)

### 1. Quy Tắc Phân Định Ranh Giới Giao Diện (RSC vs. Client)

- **Server Components (Mặc định)**: Toàn bộ các trang và tệp tin trong thư mục `app/` phải giữ nguyên là Server Components. **Không** lạm dụng `'use client';` ở đầu trang lớn. Giữ các công việc như tìm nạp dữ liệu trực tiếp từ DB, cấu hình SEO và dựng khung giao diện tĩnh trên Server.
- **Client Components (Cô lập)**: Chỉ khai báo `'use client';` cho các thành phần giao diện nhỏ cần sự tương tác kéo/thả, sự kiện nhấp chuột, hoặc cần sử dụng state/hooks (ví dụ: `components/shared/counter-demo.tsx`). Nhập khẩu chúng vào trang Server Component để lắp ráp.

---

### 2. Quản Lý Trạng Thái Toàn Cục (Zustand Stores)

- **Nguyên tắc phân rã**: Tuyệt đối **không** gộp các biến trạng thái không liên quan vào chung một store nguyên khối. Hãy chia nhỏ thành các tệp tin lưu trữ riêng biệt như cấu trúc hiện tại:
  - `useUIStore`: Quản lý sidebar đóng/mở và cờ hydration.
  - `useCounterStore`: Quản lý bộ đếm.
- **Đăng ký store mới**:
  1. Tạo tệp tin `stores/use-[tên]-store.ts`.
  2. Định cấu hình kiểu dữ liệu, các action cập nhật state và tích hợp middleware `persist` (nếu cần lưu trữ lâu dài).
  3. Export store mới thông qua tệp tin tập trung `stores/index.ts` để tối giản đường dẫn nhập khẩu.

---

### 3. Quản Lý Trạng Thái Máy Chủ (TanStack Query)

- **Sử dụng Query Key Factory**: Định nghĩa tập trung cấu trúc key truy vấn trong `hooks/queries/keys.ts` nhằm hạn chế gõ sai ký tự và tối ưu hóa việc dọn dẹp cache:
  ```typescript
  export const queryKeys = {
    todos: {
      all: ['todos'] as const,
      lists: () => [...queryKeys.todos.all, 'list'] as const,
      detail: (id: string) => [...queryKeys.todos.all, 'detail', id] as const,
    },
  };
  ```
- **Kỹ thuật ngậm nước (Hydration)**: Khi cần nạp trước dữ liệu từ Server để tăng tốc hiển thị và phục vụ SEO, thực hiện prefetch tại Server Component rồi truyền tải qua lớp bọc `HydrationBoundary`:
  ```tsx
  // Tại Server Component
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.todos.lists(),
    queryFn: getTodosData,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoListClient /> {/* Client component tự nhận cache ngầm qua hook cùng key */}
    </HydrationBoundary>
  );
  ```

---

### 4. Hệ Thống Thiết Kế (Tailwind CSS v4 & custom tokens)

Dự án ứng dụng Tailwind CSS v4 cấu trúc **CSS-first**. Tệp `app/globals.css` là nơi duy nhất khai báo cấu hình:

- **Hệ thống màu (Color Tokens)**: Định cấu hình màu sắc trong bộ chọn `:root` (Warm theme) và lớp `.dark` (Dark theme) để hỗ trợ đồng bộ tự động thông qua `next-themes`.
- **Mở rộng class tiện ích**: Đăng ký biến màu sắc và font chữ trực tiếp bên trong `@theme inline`:
  ```css
  @theme inline {
    --color-background: var(--background);
    --font-sans: var(--font-plex-sans);
    --font-display: var(--font-fraunces);
  }
  ```
- **Thêm mới UI**: Để tải thêm các component nền tảng từ shadcn/ui, sử dụng câu lệnh CLI:
  ```bash
  npx shadcn@latest add <component_name>
  ```

---

### 5. An Toàn Kiểm Soát Môi Trường (Type-Safe Env)

Khi cần khai báo thêm bất cứ biến môi trường nào (ví dụ: tệp cấu hình thanh toán, khoá API):

1. Thêm định dạng kiểm tra bằng Zod vào `lib/env.ts` tại hai khối `server` (biến bảo mật) hoặc `client` (biến công khai trên trình duyệt có tiền tố `NEXT_PUBLIC_`).
2. Khai báo ánh xạ tương ứng vào mục `runtimeEnv`.
3. Nhập khẩu sử dụng an toàn trong mã nguồn: `import { env } from '@/lib/env';`. Hệ thống sẽ chặn ngay lập tức quá trình khởi động và báo lỗi nếu phát hiện thiếu hoặc định dạng cấu hình không chuẩn xác.

---

### 6. Chất Lượng Mã Nguồn & Quy Trình Git Hooks

Dự án được tích hợp bộ bảo vệ mã nguồn tự động hóa trước mỗi lần bạn thực hiện lệnh `git commit`:

- Tệp tin cấu hình [.husky/pre-commit](file:///.husky/pre-commit) đã được phân quyền thực thi tối đa.
- Khi commit, **lint-staged** sẽ tự động bắt các tệp mã nguồn thay đổi để thực thi:
  1. `eslint --fix`: Tự động tìm và sửa lỗi cú pháp, kiểu dữ liệu không chuẩn mực.
  2. `prettier --write`: Tự động căn chỉnh và định dạng lại dòng code cho đồng đều.
- Nếu có bất kỳ lỗi nào không thể tự động sửa đổi, lệnh commit sẽ bị huỷ bỏ để bảo vệ kho lưu trữ code chung luôn sạch sẽ.
