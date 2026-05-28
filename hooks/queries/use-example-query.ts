'use client';

import { useQuery } from '@tanstack/react-query';
import { sleep } from '@/lib/utils';
import { queryKeys } from './keys';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

async function fetchTodo(id: string): Promise<Todo> {
  await sleep(600); // Simulate network latency

  const mockTodos: Record<string, string> = {
    '1': 'Thiết lập ranh giới Server Components (RSC) tối ưu',
    '2': 'Phân rã Zustand Monolith thành các store nhỏ',
    '3': 'Sửa Husky hooks v9 và phân quyền git index',
  };

  return {
    id,
    title: mockTodos[id] || `Công việc giả định số #${id}`,
    completed: id === '1',
  };
}

// Lưu ý: Đây chỉ là file ví dụ (example), cung cấp mẫu để khởi tạo React Query hooks.
// Bạn có thể tham khảo hoặc comment lại toàn bộ logic trong file này khi bắt đầu dự án thực tế.

export function useExampleQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.todos.detail(id),
    queryFn: () => fetchTodo(id),
  });
}
