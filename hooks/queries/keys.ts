// Lưu ý: Đây cũng là file ví dụ sử dụng query keys factory pattern.
// Khuyến nghị tổ chức các query keys tập trung tại đây và điều chỉnh cho dự án thật.

export const queryKeys = {
  todos: {
    all: ['todos'] as const,
    lists: () => [...queryKeys.todos.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.todos.all, 'detail', id] as const,
  },
};
