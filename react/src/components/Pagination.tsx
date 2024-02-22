import clsx from 'clsx';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT } from '~/constants/default';
import { SEARCH_PARAM_KEY } from '~/constants/key';

interface PaginationProps {
  total?: number;
}

export const Pagination = ({ total = 0 }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(SEARCH_PARAM_KEY.PAGE) || 1);
  const limit = Number(searchParams.get(SEARCH_PARAM_KEY.LIMIT) || DEFAULT.PAGE_LIMIT);

  const totalPage = Math.ceil(total / limit);

  const handlePageChange = (currentPage: number) => {
    searchParams.set(SEARCH_PARAM_KEY.PAGE, currentPage.toString());
    setSearchParams(searchParams);
  };

  React.useEffect(() => {
    if (page > totalPage) handlePageChange(1);
  }, [total]);

  return (
    <div className="flex justify-center join">
      <button
        className={`join-item btn btn-sm ${clsx({ 'btn-disabled': page <= 1 })}`}
        onClick={() => handlePageChange(page - 1)}
      >
        «
      </button>
      <button className="join-item btn btn-sm">Page {page}</button>
      <button
        className={`join-item btn btn-sm ${clsx({ 'btn-disabled': page >= totalPage })}`}
        onClick={() => handlePageChange(page + 1)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
