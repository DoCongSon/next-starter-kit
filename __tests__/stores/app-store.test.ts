import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '@/stores/use-ui-store';
import { useCounterStore } from '@/stores/use-counter-store';

/**
 * FILE KIỂM THỬ ĐƠN VỊ CHO ZUSTAND STORES (UNIT TEST FOR STORES)
 *
 * Tệp tin này kiểm thử các hành vi cập nhật trạng thái (State Actions) của Zustand stores.
 * Lưu ý quan trọng: Luôn phải sử dụng `beforeEach` để reset lại trạng thái ban đầu của store
 * trước mỗi bài test, tránh việc dữ liệu của bài test trước bị rò rỉ (leak) sang bài test sau.
 */

describe('Kiểm thử bộ quản lý trạng thái phân rã (Modular Stores)', () => {
  // ==========================================
  // 1. KIỂM THỬ COUNTER STORE (BỘ ĐẾM SỐ)
  // ==========================================
  describe('Counter Store (Nghiệp vụ đếm)', () => {
    beforeEach(() => {
      // Thiết lập lại trạng thái mặc định của store trước mỗi ca test
      useCounterStore.setState({
        counter: 0,
      });
    });

    it('1. Tăng số đếm chính xác khi trigger action increment()', () => {
      // Trigger action tăng số lần 1
      useCounterStore.getState().increment();
      expect(useCounterStore.getState().counter).toBe(1);

      // Trigger action tăng số lần 2
      useCounterStore.getState().increment();
      expect(useCounterStore.getState().counter).toBe(2);
    });

    it('2. Đặt lại số đếm về 0 chính xác khi trigger action reset()', () => {
      // Tăng lên trước rồi reset để kiểm thử hành vi đặt lại
      useCounterStore.getState().increment();
      useCounterStore.getState().reset();
      expect(useCounterStore.getState().counter).toBe(0);
    });
  });

  // ==========================================
  // 2. KIỂM THỬ UI STORE (GIAO DIỆN)
  // ==========================================
  describe('UI Store (Giao diện)', () => {
    beforeEach(() => {
      // Thiết lập lại trạng thái mặc định của store giao diện
      useUIStore.setState({
        sidebarOpen: true,
        isHydrated: false,
      });
    });

    it('1. Đảo trạng thái hiển thị sidebar chính xác khi trigger action toggleSidebar()', () => {
      const initialState = useUIStore.getState().sidebarOpen;

      // Thực thi ẩn/hiện sidebar
      useUIStore.getState().toggleSidebar();
      expect(useUIStore.getState().sidebarOpen).toBe(!initialState);
    });

    it('2. Chuyển đổi cờ đồng bộ Hydration chính xác khi trigger action setHydrated()', () => {
      useUIStore.getState().setHydrated();
      expect(useUIStore.getState().isHydrated).toBe(true);
    });
  });
});
