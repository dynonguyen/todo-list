'use server';

import to from 'await-to-js';
import { revalidateTag } from 'next/cache';

const REVALIDATE_TIME = 360;

export async function fetcher<T = unknown, E = Error>(
  endpoint: string,
  options?: RequestInit & { params?: any; tags?: string[]; throwError?: boolean }
): Promise<[E, undefined] | [null, T]> {
  const { params, tags, throwError = true, ...fetchOpts } = options || {};
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';

  const [error, data] = await to<T, E>(
    fetch(process.env.NEXT_PUBLIC_API_URI + endpoint + queryString, {
      next: { revalidate: REVALIDATE_TIME, tags: tags },
      headers: { 'Content-type': 'application/json' },
      method: 'GET',
      ...fetchOpts
    }).then((res) => res.json())
  );

  if (throwError && error) throw error;

  // @ts-ignore
  return [error, data];
}

export async function mutation<T = unknown, E = Error>(
  endpoint: string,
  options?: Omit<RequestInit, 'body'> & {
    params?: any;
    body?: any;
    method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    invalidatesTags?: string[];
    throwError?: boolean;
  }
): Promise<[E, undefined] | [null, T]> {
  const { params, throwError = true, body, method = 'POST', invalidatesTags, ...mutateOpts } = options || {};
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';

  const [error, data] = await to<T, E>(
    fetch(process.env.NEXT_PUBLIC_API_URI + endpoint + queryString, {
      headers: { 'Content-type': 'application/json' },
      method,
      ...(body && { body: JSON.stringify(body) }),
      ...mutateOpts
    }).then((res) => res.json())
  );

  if (throwError && error) throw error;

  if (invalidatesTags) {
    invalidatesTags.forEach((tag) => revalidateTag(tag));
  }

  // @ts-ignore
  return [error, data];
}
