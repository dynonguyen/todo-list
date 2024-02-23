import { debounce } from 'lodash-es';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_PARAM_KEY } from '~/constants/key';

export const SearchBar = ({ searchBy }: { searchBy: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = React.useCallback(
    debounce((ev: React.ChangeEvent<HTMLInputElement>) => {
      const keyword = ev.target.value.trim();

      if (keyword) {
        searchParams.set(SEARCH_PARAM_KEY.SEARCH_BY, searchBy);
        searchParams.set(SEARCH_PARAM_KEY.KEYWORD, keyword);
      } else {
        searchParams.delete(SEARCH_PARAM_KEY.SEARCH_BY);
        searchParams.delete(SEARCH_PARAM_KEY.KEYWORD);
      }

      setSearchParams(searchParams);
    }, 350),
    []
  );

  return (
    <label className="flex items-center h-10 gap-2 input input-bordered">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        autoFocus
        defaultValue={searchParams.get(SEARCH_PARAM_KEY.KEYWORD) || ''}
        onChange={handleSearch}
      />
      <span className="icon-[ph--magnifying-glass] w-4 h-4 text-gray-500"></span>
    </label>
  );
};

export default SearchBar;
