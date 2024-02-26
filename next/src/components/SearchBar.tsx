'use client';

import { debounce } from 'lodash-es';
import React from 'react';
import { SEARCH_PARAM_KEY } from '~/constants/key';
import useSearchParams from '~/hooks/useSearchParams';

export const SearchBar = ({ searchBy }: { searchBy: string }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSearch = React.useCallback(
		debounce((ev: React.ChangeEvent<HTMLInputElement>) => {
			const keyword = ev.target.value.trim();

			if (keyword) {
				setSearchParams({
					[SEARCH_PARAM_KEY.SEARCH_BY]: searchBy,
					[SEARCH_PARAM_KEY.KEYWORD]: keyword,
				});
			} else {
				setSearchParams({
					[SEARCH_PARAM_KEY.SEARCH_BY]: null,
					[SEARCH_PARAM_KEY.KEYWORD]: null,
				});
			}
		}, 350),
		[],
	);

	return (
		<label className='flex items-center h-10 gap-2 input input-bordered'>
			<input
				type='text'
				className='grow'
				placeholder='Search'
				autoFocus
				defaultValue={searchParams.get(SEARCH_PARAM_KEY.KEYWORD) || ''}
				onChange={handleSearch}
			/>
			<span className='icon-[ph--magnifying-glass] w-4 h-4 text-gray-500'></span>
		</label>
	);
};

export default SearchBar;
