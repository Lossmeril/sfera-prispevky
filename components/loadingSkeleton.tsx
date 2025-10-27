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
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="animate-pulse" key={i}>
          <div
            className={`bg-gray-300 w-full ${width} ${height} ${
              rounded ? "rounded-md" : ""
            }`}
          />{" "}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
