import to from 'await-to-js';
import { getEnv } from './helper';

const REVALIDATE_TIME = 360;

export async function fetcher<T = unknown, E = Error>(
  endpoint: string,
  options?: RequestInit & { params?: any; tags?: string[]; throwError?: boolean }
): Promise<[E, undefined] | [null, T]> {
  const { params, tags, throwError = true, ...fetchOpts } = options || {};
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';

  const [error, data] = await to<T, E>(
    fetch(getEnv('NEXT_PUBLIC_API_URI') + endpoint + queryString, {
      next: { revalidate: REVALIDATE_TIME, tags: tags },
      ...fetchOpts
    }).then((res) => res.json())
  );

  if (throwError && error) throw error;

  // @ts-ignore
  return [error, data];
}
