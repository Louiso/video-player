import {useRef, useEffect, useCallback} from 'react';

export function useDebouncedCallback(callback, delay, deps) {
  const fnTimeoutHandler = useRef();
  const debouncedFn = useCallback(callback, deps);

  useEffect(
    () => () => {
      if (fnTimeoutHandler.current) {
        clearTimeout(fnTimeoutHandler.current);
      }
    },
    [],
  );

  return (...args) => {
    if (fnTimeoutHandler.current) {
      clearTimeout(fnTimeoutHandler.current);
    }
    fnTimeoutHandler.current = setTimeout(() => {
      debouncedFn(...args);
    }, delay);
  };
}
