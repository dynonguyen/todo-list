import {
	ReadonlyURLSearchParams,
	useSearchParams as useSearchParamsReadonly,
} from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

export const useSearchParams = (): [
	ReadonlyURLSearchParams,
	(params: Record<string, string | null>) => void,
] => {
	const searchParams = useSearchParamsReadonly();
	const router = useRouter();

	const setSearchParams = React.useCallback(
		(params: Record<string, string | null>) => {
			const newSearchParams = new URLSearchParams(searchParams.toString());

			Object.entries(params).forEach(([key, value]) => {
				if (value === null) {
					newSearchParams.delete(key);
				} else {
					newSearchParams.set(key, value);
				}
			});

			router.replace(`?${newSearchParams.toString()}`, '', { scroll: false });
		},
		[searchParams],
	);

	return [searchParams, setSearchParams];
};

export default useSearchParams;
