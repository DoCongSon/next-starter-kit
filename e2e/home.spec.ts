import { test, expect } from '@playwright/test';

/**
 * FILE HƯỚNG DẪN & KIỂM THỬ E2E (END-TO-END) MẪU BẰNG PLAYWRIGHT
 *
 * Tệp tin này kiểm thử toàn diện luồng hành vi của người dùng từ góc nhìn trình duyệt thực tế.
 * Playwright sẽ tự động khởi động trình duyệt ẩn (headless) để thực hiện các thao tác:
 * truy cập trang, nhấp chuột, kiểm tra giao diện trực quan và sự thay đổi của DOM.
 */

test.describe('Kiểm thử giao diện Trang Chủ (Home Page Showcase)', () => {
  test('1. Kiểm tra trang chủ tải chính xác tiêu đề tĩnh (RSC)', async ({ page }) => {
    // Điều hướng trình duyệt tới trang chủ (URL '/' được cấu hình trong playwright.config.ts)
    await page.goto('/');

    // Định vị thẻ h1 chứa tiêu đề chính của trang
    const header = page.locator('h1');

    // Kiểm định xem tiêu đề tĩnh render từ Server đã chính xác chưa (RSC kiểm chứng)
    await expect(header).toContainText('Nền tảng tối giản.');

    // Kiểm tra xem Huy hiệu "Arcadia Starter" có hiển thị trên màn hình không
    const badge = page.locator('.inline-flex', { hasText: 'Arcadia Starter' });
    await expect(badge).toBeVisible();
  });

  test('2. Kiểm thử tương tác nút đếm Counter (Zustand Client State)', async ({ page }) => {
    await page.goto('/');

    // Tìm nút bấm bắt đầu bằng từ khóa "Đã bấm: 0"
    const countButton = page.locator('button', { hasText: 'Đã bấm:' });
    await expect(countButton).toBeVisible();
    await expect(countButton).toContainText('0');

    // Click nút lần 1 -> Đảm bảo Zustand Store tăng số đếm lên 1 và giao diện Client render lại
    await countButton.click();
    await expect(countButton).toContainText('1');

    // Click nút lần 2 -> Số đếm lên 2
    await countButton.click();
    await expect(countButton).toContainText('2');

    // Tìm và bấm nút "Đặt lại" để reset bộ đếm về 0
    const resetButton = page.locator('button', { hasText: 'Đặt lại' });
    await resetButton.click();
    await expect(countButton).toContainText('0');
  });

  test('3. Kiểm thử tương tác TanStack Query (Server State)', async ({ page }) => {
    await page.goto('/');

    // Tìm phần vùng hiển thị Task của Query Demo
    const taskBadge = page.locator('.inline-flex', { hasText: 'Task #' });
    await expect(taskBadge).toBeVisible();

    // Bấm chuyển sang Task #2 và kiểm tra dữ liệu thay đổi
    const task2Btn = page.locator('button', { hasText: '#2' });
    await task2Btn.click();

    // Kiểm tra xem badge Task có tự động đổi sang số #2 không
    await expect(taskBadge).toContainText('Task #2');
  });
});
