import clsx from "clsx";
import { useState } from "react";

const filterOptions = ["All", "Unread", "Archived", "Blocked"];

const Filter = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [toggelFilterMenu, setToggelFilterMenu] = useState(false);
  return (
    <div
      className={clsx(
        "sm:fixed bg-white py-4 w-[30%] z-30  ",
        "sm:border-t-[1px] sm:border-r-[1px] border-gray-300",
        "overflow-x-scroll scroll-smooth custom-scrollbar2 sm:mt-[10vh]"
      )}
    >
      <div className="w-8 h-8 sm:hidden text-center pt-1 font-extrabold bg-gray-400 rounded-full" onClick={() => setToggelFilterMenu(!toggelFilterMenu)}>:</div>
      <div
        className={clsx(
          "sm:flex gap-4 px-8 sm:relative absolute bg-white",
          toggelFilterMenu ? "flex-col" : "hidden"
        )}
      >
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
