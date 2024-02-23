export const LoadingSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4 px-4">
      {Array(12)
        .fill(1)
        .map((_, index) => (
          <div key={index} className="w-[55px] h-[55px] rounded-lg bg-base-200 animate-pulse" />
        ))}
    </div>
  );
};

export default LoadingSkeleton;
