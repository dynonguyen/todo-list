import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CATEGORY_ICON_PREFIX, ICONIFY_API_URI } from '~/constants/common';
import { QUERY_KEY } from '~/constants/key';

export const useGetCategoryIcons = (props?: { size?: number; search?: string }) => {
  const { search = '', size = 14 } = props || {};

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.CATEGORY_ICON],
    queryFn: () => axios.get(`${ICONIFY_API_URI}/collection?prefix=${CATEGORY_ICON_PREFIX}`).then((res) => res.data)
  });

  if (isLoading) return [];

  let icons = Object.values(data.categories).flatMap((iconList) => iconList) as string[];

  if (search) {
    icons = icons.filter((icon) => icon.includes(search));
  }

  return icons.slice(0, size).map((icon) => `${ICONIFY_API_URI}/${CATEGORY_ICON_PREFIX}/${icon}.svg`);
};

export default useGetCategoryIcons;
