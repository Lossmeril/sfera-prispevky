import React from "react";

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  count?: number;
  rounded?: boolean;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = "w-full",
  height = "h-4",
  count = 1,
  rounded = true,
}) => {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-300 w-full ${width} ${height} ${
            rounded ? "rounded-md" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
