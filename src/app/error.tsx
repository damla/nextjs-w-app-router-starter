'use client';

import { Button } from '@nextui-org/react';

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
