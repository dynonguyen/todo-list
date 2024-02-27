// -----------------------------
type TypeMap<T> = {
  [K in keyof T]: T[K];
};
export type ValueMap<T> = TypeMap<T>[keyof TypeMap<T>];

// -----------------------------
export type Paginated<T> = {
  docs: T[];
  pagination: {
    _page: number;
    _limit: number;
    _total: number;
  };
};
