export type Paginated<T> = {
  docs: T[];
  pagination: {
    _page: number;
    _limit: number;
    _total: number;
  };
};
