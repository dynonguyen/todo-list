import { ENDPOINT } from '~/constants/endpoint';
import { TAGS } from '~/constants/key';
import { Category } from '~/types/Category';
import { fetcher } from '~/utils/fetcher';
import CategoryItem from './(category-list)/components/CategoryItem';
import NewCategory from './(new-category)';

export const CategoryPage = async () => {
  const [_, categories = []] = await fetcher<Category[]>(ENDPOINT.GET_CATEGORIES, {
    tags: [TAGS.CATEGORIES]
  });

  return (
    <div className="grid grid-cols-4 gap-4 px-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}

      <NewCategory />
    </div>
  );
};

export default CategoryPage;
