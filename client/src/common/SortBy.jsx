import React from 'react';

const SortBy = () => {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-gray-700 font-sans">Sort by:</label>
      <select className=" bg-transparent border-none text-gray-700 font-bold  cursor-pointer focus:outline-none">
        <option>Recommended</option>
        <option>Price</option>
        <option>Duration</option>
      </select>
    </div>
  );
};

export default SortBy;
