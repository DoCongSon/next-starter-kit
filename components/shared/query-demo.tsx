'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExampleQuery } from '@/hooks/queries/use-example-query';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw } from 'lucide-react';

export function QueryDemo() {
  const [activeId, setActiveId] = useState<string>('1');
  const { data, isLoading, isFetching, refetch, isError, error } = useExampleQuery(activeId);

  return (
    <Card className="w-full max-w-xl mx-auto border-border bg-card shadow-soft text-left mt-8 overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/20 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-display font-bold">TanStack Query Demo</CardTitle>
            <CardDescription className="text-sm">
              Trình diễn cơ chế Caching & Sync Server State
            </CardDescription>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="rounded-full size-8"
          >
            <RefreshCw className={`size-4 ${isFetching ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* ID Selector Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-muted-foreground mr-2">Chọn ID:</span>
          {['1', '2', '3'].map((id) => (
            <Button
              key={id}
              size="sm"
              variant={activeId === id ? 'default' : 'outline'}
              onClick={() => setActiveId(id)}
              className="px-4 font-mono font-bold"
            >
              #{id}
            </Button>
          ))}
        </div>

        {/* Content Box */}
        <div className="min-h-[140px] relative rounded-lg border border-border/40 p-4 bg-muted/5 overflow-hidden">
          {/* Silence Loading / Fetching status overlay in top-right */}
          {isFetching && !isLoading && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
              <Loader2 className="size-3 animate-spin" />
              <span>Đang cập nhật...</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="flex gap-2 items-center">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </motion.div>
            ) : isError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-destructive py-2 text-sm"
              >
                Có lỗi xảy ra khi fetch dữ liệu:{' '}
                {error instanceof Error ? error.message : 'Unknown error'}
              </motion.div>
            ) : (
              <motion.div
                key={data?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="font-mono text-xs border-accent/40 text-accent"
                  >
                    Task #{data?.id}
                  </Badge>
                  {data?.completed ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 border-transparent">
                      Hoàn thành
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-amber-500/10 text-amber-600 border-transparent"
                    >
                      Đang xử lý
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-semibold leading-snug text-foreground">
                  {data?.title}
                </h3>

                <p className="text-xs text-muted-foreground">
                  * Mẹo: Bấm qua lại giữa các ID đã tải để thấy tốc độ phản hồi **lập tức
                  (instant)** từ bộ nhớ đệm (Cache) mà không phải chờ đợi!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>

      <CardFooter className="border-t border-border bg-muted/5 py-3 text-[11px] text-muted-foreground justify-between">
        <span>Server State: Mock API latency is 600ms</span>
        <span className="font-mono">staleTime: 0s (default)</span>
      </CardFooter>
    </Card>
  );
}
