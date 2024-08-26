'use client';

import { useCounterStore } from '@/providers/counter-store-provider';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { count, incrementCount, decrementCount, resetCount } = useCounterStore(
    (state) => state,
  );

  return (
    <div>
      Count: {count}
      <hr />
      <Button onClick={() => incrementCount()}>Increment Count</Button>
      <Button onClick={() => decrementCount()}>Decrement Count</Button>
      <Button onClick={() => resetCount()}>Reset Count</Button>
    </div>
  );
}
