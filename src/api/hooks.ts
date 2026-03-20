import { useEffect, useState } from 'react';
import type { DependencyList } from 'react';
import type { ApiError } from './client';

export type AsyncState<T> = {
  data: T;
  loading: boolean;
  error: ApiError | null;
};

export function useAsync<T>(fn: () => Promise<T>, deps: DependencyList, initialData: T): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: initialData, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    fn()
      .then((data) => {
        if (cancelled) return;
        setState({ data, loading: false, error: null });
      })
      .catch((error: ApiError) => {
        if (cancelled) return;
        setState({ data: initialData, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

