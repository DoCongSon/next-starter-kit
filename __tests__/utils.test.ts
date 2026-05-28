import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

/**
 * FILE KIỂM THỬ ĐƠN VỊ (UNIT TEST) MẪU BẰNG VITEST
 *
 * Tệp tin này dùng để viết các kiểm thử đơn vị cho hàm tiện ích hoặc logic không phụ thuộc vào UI.
 * Vitest chạy cực nhanh trên môi trường JSDOM giả lập, rất phù hợp để kiểm tra tính chính xác của hàm `cn`
 * hoặc các tính toán nghiệp vụ (business logic) khác.
 */

describe('Kiểm thử bộ tiện ích hệ thống (utils)', () => {
  describe('Hàm kết hợp class CSS cn()', () => {
    it('1. Kết hợp các class name đơn giản một cách chính xác', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    });

    it('2. Xử lý đúng các class có điều kiện (conditional classes)', () => {
      expect(cn('base-class', true && 'is-true', false && 'is-false')).toBe('base-class is-true');
    });

    it('3. Giải quyết triệt để xung đột chồng chéo của Tailwind CSS (Tailwind Merge)', () => {
      // Khi có hai class cùng thuộc tính (padding), Tailwind CSS v4 sẽ ưu tiên giữ lại class viết sau
      expect(cn('px-2 py-1', 'p-4')).toBe('p-4');

      // Khi có hai class màu nền trùng nhau, giữ lại màu nền phía sau
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });
  });
});
