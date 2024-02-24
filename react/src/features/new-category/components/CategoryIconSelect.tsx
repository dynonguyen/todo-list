import clsx from 'clsx';
import { debounce } from 'lodash-es';
import React from 'react';
import useGetCategoryIcons from '../hooks/useGetCategoryIcons';

interface CategoryIconSelectProps {
  value?: string;
  onSelect?: (icon: string) => void;
}

export const CategoryIconSelect = (props: CategoryIconSelectProps) => {
  const { onSelect, value } = props;

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const icons = useGetCategoryIcons({ search });

  const handleSearch = React.useCallback(
    debounce((ev) => setSearch(ev.target.value.toLowerCase()), 200),
    []
  );

  return (
    <React.Fragment>
      {value ? (
        <div
          className="flex items-center justify-center transition-colors rounded-md cursor-pointer w-11 h-11 bg-base-300/70 hover:bg-base-300"
          onClick={() => setOpen(!open)}
        >
          <img src={value} className="w-5 h-5 mx-auto" />
        </div>
      ) : (
        <button type="button" className="btn btn-sm" onClick={() => setOpen(!open)}>
          Choose icon
        </button>
      )}

      <div className={clsx('dropdown', { 'dropdown-open': open })}>
        <div className="dropdown-content z-[1] menu p-3 shadow bg-base-100 rounded-box w-full">
          <div className="mb-4">
            <label className="flex items-center gap-2 input input-sm input-bordered">
              <input onChange={handleSearch} type="text" className="grow" placeholder="Search" />
              <span className="icon-[ph--magnifying-glass] w-4 h-4 opacity-70"></span>
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            {icons.length ? (
              icons.map((icon) => (
                <img
                  key={icon}
                  title={icon.split('/').pop()?.replace('.svg', '')}
                  src={icon}
                  className="w-5 h-5 mx-auto transition-transform cursor-pointer hover:scale-110"
                  onClick={() => {
                    setOpen(false);
                    onSelect?.(icon);
                  }}
                />
              ))
            ) : (
              <div className="mx-auto text-sm text-center text-gray-500">No icon found</div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryIconSelect;
