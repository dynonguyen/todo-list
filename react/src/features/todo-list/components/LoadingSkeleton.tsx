import { DEFAULT } from '~/constants/default';

export const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mx-4">
      {Array(DEFAULT.PAGE_LIMIT)
        .fill(1)
        .map((_, index) => (
          <div key={index} className="rounded-lg bg-base-200 h-[72px]"></div>
        ))}
    </div>
  );
};

export default LoadingSkeleton;
