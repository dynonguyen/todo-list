import { API_URI } from '~/constants/common';

export const swrFetcher = async (endpoint: string, options: any) => {
  return fetch(API_URI + endpoint, { headers: { 'Content-Type': 'application/json' }, ...options }).then((res) =>
    res.json()
  );
};
