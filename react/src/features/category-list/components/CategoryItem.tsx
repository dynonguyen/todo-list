import { CATEGORY_ICON_PREFIX, ICONIFY_API_URI } from '~/constants/common';
import { Category } from '~/types/Category';

export const CategoryItem = (props: Category) => {
  const { name, icon, color } = props;

  return (
    <div className="flex flex-col gap-2" title={name}>
      <div className="flex items-center justify-center w-[55px] h-[55px] rounded-lg" style={{ backgroundColor: color }}>
        <img className="w-8 h-8" src={`${ICONIFY_API_URI}/${CATEGORY_ICON_PREFIX}/${icon}.svg`} />
      </div>
      <div className="text-sm text-center text-base-content/80 w-[55px] truncate">{name}</div>
    </div>
  );
};

export default CategoryItem;
