import React from "react";

const CategoriesLoader = () => (
  <div className="flex skeleton rounded-none h-16 w-full">
    <div className="flex items-center justify-start space-x-4 px-4 max-w-[1280px] mx-auto w-full overflow-x-auto">
      <div className="skeleton h-4 w-28 rounded-full bg-base-100 flex-shrink-0"></div>
      <div className="skeleton h-4 w-28 rounded-full bg-base-100 flex-shrink-0"></div>
      <div className="skeleton h-4 w-28 rounded-full bg-base-100 flex-shrink-0"></div>
      <div className="skeleton h-4 w-28 rounded-full bg-base-100 flex-shrink-0"></div>
      <div className="skeleton h-4 w-28 rounded-full bg-base-100 flex-shrink-0"></div>
      <div className="skeleton h-4 w-28 rounded-full bg-base-100 flex-shrink-0"></div>
    </div>
  </div>
);

export default CategoriesLoader;
