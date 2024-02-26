'use client';

import clsx from 'clsx';
import { SEARCH_PARAM_KEY } from '~/constants/key';
import useSearchParams from '~/hooks/useSearchParams';

export type FilterValue = 'all' | 'active' | 'completed';

export const TodoFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filtered = (searchParams.get(SEARCH_PARAM_KEY.FILTER) as FilterValue) || 'all';

  const handleFilterChange = (filter: FilterValue) => {
    // searchParams.set(SEARCH_PARAM_KEY.FILTER, filter);
    // setSearchParams(searchParams);
  };

  const filters: Array<{ value: FilterValue; title: string; active: boolean }> = [
    { value: 'all', title: 'All', active: filtered !== 'active' && filtered !== 'completed' },
    { value: 'active', title: 'Active', active: filtered === 'active' },
    { value: 'completed', title: 'Completed', active: filtered === 'completed' }
  ];

  return (
    <div className="flex justify-between gap-2">
      {filters.map((item) => (
        <button
          key={item.value}
          className={clsx('btn btn-outline grow btn-sm btn-neutral', { 'btn-active btn-accent': item.active })}
          onClick={() => handleFilterChange(item.value)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
