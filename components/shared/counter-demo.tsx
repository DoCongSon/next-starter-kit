'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCounterStore } from '@/stores';
import { Button } from '@/components/ui/button';

export function CounterDemo() {
  const { counter, increment, reset } = useCounterStore();

  return (
    <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
      <motion.div
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <Button size="lg" onClick={increment} className="shadow-soft min-w-[140px]">
          Đã bấm:
          <span className="inline-flex overflow-hidden h-6 ml-1 items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={counter}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="font-mono font-bold"
              >
                {counter}
              </motion.span>
            </AnimatePresence>
          </span>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <Button size="lg" variant="outline" onClick={reset} className="min-w-[100px]">
          Đặt lại
        </Button>
      </motion.div>
    </div>
  );
}
