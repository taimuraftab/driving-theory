// client/src/hooks/usePrompt.js
import { useCallback } from 'react';
import { useBlocker } from './useBlocker';

export function usePrompt(message, when) {
  const blocker = useCallback(
    (tx) => {
      if (window.confirm(message)) {
        tx.retry();
      }
    },
    [message]
  );

  useBlocker(blocker, when);
}
