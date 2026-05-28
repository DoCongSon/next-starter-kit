import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * FILE QUẢN LÝ TRẠNG THÁI GIAO DIỆN HỆ THỐNG (UI GLOBAL STORE) BẰNG ZUSTAND
 *
 * Tệp tin này quản lý các trạng thái liên quan đến hiển thị giao diện toàn cục (như sidebar).
 *
 * Các đặc tính kỹ thuật nâng cao:
 * 1. `devtools`: Middleware giúp tích hợp trực quan hóa state trên Redux DevTools của trình duyệt.
 * 2. `persist`: Middleware tự động lưu trữ trạng thái xuống `localStorage` qua khoá `app-ui-store`.
 * 3. `onRehydrateStorage`: Giải quyết triệt để lỗi Hydration Mismatch bằng cách trì hoãn sử dụng
 *    dữ liệu lưu trữ cho tới khi quá trình đồng bộ hoá (Rehydration) hoàn tất và cập nhật cờ `isHydrated`.
 */

type UIState = {
  sidebarOpen: boolean;
  isHydrated: boolean;
  toggleSidebar: () => void;
  setHydrated: () => void;
};

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: true,
        isHydrated: false,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setHydrated: () => set({ isHydrated: true }),
      }),
      {
        name: 'app-ui-store',
        onRehydrateStorage: () => (state) => {
          // Callback thực thi ngay sau khi quá trình đồng bộ localStorage hoàn thành
          state?.setHydrated();
        },
      },
    ),
  ),
);
