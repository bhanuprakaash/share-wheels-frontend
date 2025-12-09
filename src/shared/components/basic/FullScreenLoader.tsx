import React from "react";
import Loader from "./Loader.tsx";

type FullScreenLoaderProps = {
  overlay?: boolean;
  className?: string;
};

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ overlay = false, className = "" }) => (
  <div
    className={`${
      overlay ? "fixed inset-0 z-50" : "w-full min-h-[75vh]"
    } flex items-center justify-center ${className}`}
  >
    <Loader />
  </div>
);

export default FullScreenLoader;
