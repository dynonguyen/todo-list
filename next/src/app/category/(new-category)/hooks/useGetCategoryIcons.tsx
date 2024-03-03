import React from 'react';
import { CATEGORY_ICON_PREFIX, ICONIFY_API_URI } from '~/constants/common';

export const useGetCategoryIcons = (props?: { size?: number; search?: string }) => {
  const { search = '', size = 14 } = props || {};
  const [icons, setIcons] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch(`${ICONIFY_API_URI}/collection?prefix=${CATEGORY_ICON_PREFIX}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIcons(Object.values(data.categories).flatMap((iconList) => iconList) as string[]);
      });
  }, []);

  if (!icons || !icons.length) return [];

  let filteredIcons = icons;

  if (search) {
    filteredIcons = icons.filter((icon) => icon.includes(search));
  }

  return filteredIcons.slice(0, size).map((icon) => `${ICONIFY_API_URI}/${CATEGORY_ICON_PREFIX}/${icon}.svg`);
};

export default useGetCategoryIcons;
