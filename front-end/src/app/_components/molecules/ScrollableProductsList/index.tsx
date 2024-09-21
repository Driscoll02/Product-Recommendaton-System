import React from "react";

const ScrollableProductsList = () => {
  return (
    <div className="flex mt-6 overflow-x-auto scrollbar-thin">
      <div className="w-[300px] h-[300px] bg-gray-400">
        <h1>Product 1</h1>
      </div>
      <div className="w-[300px] h-[300px] bg-gray-400">
        <h1>Product 2</h1>
      </div>
      <div className="w-[300px] h-[300px] bg-gray-400">
        <h1>Product 3</h1>
      </div>
      <div className="w-[300px] h-[300px] bg-gray-400">
        <h1>Product 4</h1>
      </div>
    </div>
  );
};

export default ScrollableProductsList;
