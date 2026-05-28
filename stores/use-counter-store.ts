import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * FILE QUẢN LÝ TRẠNG THÁI NGHIỆP VỤ SỐ ĐẾM (COUNTER BUSINESS STORE) BẰNG ZUSTAND
 *
 * Tệp tin này quản lý trạng thái đếm số trong ứng dụng demo.
 * Việc phân tách store này khỏi UI store giúp cô lập trạng thái nghiệp vụ, nâng cao tính mô-đun hoá.
 *
 * Các đặc tính kỹ thuật:
 * 1. `devtools`: Tích hợp theo dõi dòng sự kiện cập nhật state trong Redux DevTools.
 * 2. `persist`: Tự động đồng bộ số đếm xuống `localStorage` qua khoá `app-counter-store`.
 */

type CounterState = {
  counter: number;
  increment: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        counter: 0,
        increment: () => set((state) => ({ counter: state.counter + 1 })),
        reset: () => set({ counter: 0 }),
      }),
      {
        name: 'app-counter-store',
      },
    ),
  ),
);
