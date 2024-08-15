import clsx from "clsx";
import { useState } from "react";

const filterOptions = ["All", "Unread", "Archived", "Blocked"];

const Filter = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <div className="fixed bg-white py-4 border-t-[1px] border-r-[1px]  border-gray-300 w-[30%] z-50">
      <div className="flex gap-4 px-8 ">
        {filterOptions.map((i) => (
          <div
            className={clsx(
              "rounded-full py-1 px-3 border border-gray-400 cursor-pointer",
              activeFilter === i && "bg-primary text-white border-white"
            )}
            key={i}
            onClick={() => setActiveFilter(i)}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
