export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 px-4">
      {Array(12)
        .fill(1)
        .map((_, index) => (
          <div key={index} className="w-16 h-16 mx-auto rounded-lg bg-base-200 animate-pulse" />
        ))}
    </div>
  );
};

export default LoadingSkeleton;
