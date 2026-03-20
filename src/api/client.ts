export const API_BASE_URL = 'https://stack.az/api';

export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

function joinUrl(base: string, path: string) {
  const b = base.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

export function toQueryString(params?: Record<string, string | number | boolean | undefined | null>) {
  if (!params) return '';
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : '';
}

const inflightRequests = new Map<string, Promise<any>>();

export function apiFetch<T>(
  path: string,
  options?: RequestInit & { query?: Record<string, string | number | boolean | undefined | null> }
): Promise<T> {
  const url = joinUrl(API_BASE_URL, `${path}${toQueryString(options?.query)}`);

  const isGet = !options?.method || options.method.toUpperCase() === 'GET';
  
  if (isGet && inflightRequests.has(url)) {
    return inflightRequests.get(url)!;
  }

  const fetchPromise = (async () => {
    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options?.headers ?? {}),
      },
    });

    const text = await res.text();
    const data = text ? (safeJsonParse(text) as unknown) : null;

    if (!res.ok) {
      const err: ApiError = {
        message: (data as any)?.message || res.statusText || 'Request failed',
        status: res.status,
        details: data,
      };
      throw err;
    }

    return data as T;
  })();

  if (isGet) {
    inflightRequests.set(url, fetchPromise);
    fetchPromise.finally(() => {
      inflightRequests.delete(url);
    });
  }

  return fetchPromise;
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function unwrapList<T = unknown>(payload: unknown): T[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload as T[];
  if (typeof payload !== 'object') return [];

  const p: any = payload;
  const candidates = [p.data, p.items, p.results, p.rows, p.programs, p.teachers, p.posts, p.blogPosts, p.graduates, p.banners];
  for (const c of candidates) {
    if (Array.isArray(c)) return c as T[];
  }
  return [];
}

