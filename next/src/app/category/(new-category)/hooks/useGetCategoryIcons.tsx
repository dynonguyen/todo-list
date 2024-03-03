import useSWR from 'swr';
import { CATEGORY_ICON_PREFIX, ICONIFY_API_URI } from '~/constants/common';

export const useGetCategoryIcons = (props?: { size?: number; search?: string }) => {
  const { search = '', size = 14 } = props || {};

  const { data, isLoading } = useSWR(`${ICONIFY_API_URI}/collection?prefix=${CATEGORY_ICON_PREFIX}`, {
    fetcher: (url) => fetch(url).then((res) => res.json())
  });

  if (isLoading) return [];

  let icons = Object.values(data.categories).flatMap((iconList) => iconList) as string[];

  if (!icons || !icons.length) return [];

  if (search) {
    icons = icons.filter((icon) => icon.includes(search));
  }

  return icons.slice(0, size).map((icon) => `${ICONIFY_API_URI}/${CATEGORY_ICON_PREFIX}/${icon}.svg`);
};

export default useGetCategoryIcons;
