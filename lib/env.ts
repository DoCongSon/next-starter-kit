import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * FILE CẤU HÌNH & KIỂM ĐỊNH BIẾN MÔI TRƯỜNG TYPE-SAFE (ENVIRONMENT VARIABLES)
 *
 * Tệp tin này sử dụng Zod kết hợp với `@t3-oss/env-nextjs` để cấu hình và tự động kiểm định
 * tính hợp lệ của các biến môi trường (.env) ngay khi khởi động ứng dụng (startup).
 * Nếu thiếu biến môi trường hoặc định dạng không đúng, ứng dụng sẽ báo lỗi cụ thể thay vì chạy lỗi ngầm.
 */

export const env = createEnv({
  /**
   * Biến môi trường chỉ khả dụng ở phía Server (Server-side variables).
   * Bạn KHÔNG THỂ truy cập các biến này dưới trình duyệt (Client).
   * Ví dụ: DATABASE_URL, API_SECRET_KEY...
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },

  /**
   * Biến môi trường khả dụng ở cả Server và Trình duyệt (Client-side variables).
   * TẤT CẢ các biến ở đây BẮT BUỘC phải có tiền tố `NEXT_PUBLIC_` ở đầu.
   * Ví dụ: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY...
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  },

  /**
   * Khai báo bản đồ ánh xạ biến (Destructuring) cho môi trường runtime của Next.js.
   * Do Next.js thực hiện tối ưu hóa tĩnh khi biên dịch, các biến ở mục `server` và `client`
   * phải được khai báo tường minh tại `runtimeEnv` thông qua `process.env`.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
