import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CATEGORY_ICON_PREFIX, ICONIFY_API_URI } from '~/constants/common';
import { QUERY_KEY } from '~/constants/key';

export const useGetCategoryIcons = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.CATEGORY_ICON],
    queryFn: () => axios.get(`${ICONIFY_API_URI}/collection?prefix=${CATEGORY_ICON_PREFIX}`).then((res) => res.data)
  });

  if (isLoading) return [];

  const icons = Object.values(data.categories).flatMap((iconList) => iconList) as string[];

  return icons.slice(0, 24).map((icon) => `${ICONIFY_API_URI}/${CATEGORY_ICON_PREFIX}/${icon}.svg`);
};

export default useGetCategoryIcons;
