import clsx from "clsx";

const Search = () => {
  return (
    <div className="py-4 flex justify-center items-center border-r-[1px] border-gray-300">
      <div
        className={clsx(
          "relative ",
          "w-[90%] h-[6vh] rounded-lg",
          "border-[1.5px] border-slate-300 bg-slate-100 "
        )}
      >
        <input
          type="search"
          className={clsx(
            "w-full bg-transparent h-[6vh] pl-10 pr-2",
            "outline-none text-[18px]"
          )}
          placeholder="Search"
        />
        <img
          src={`/search.svg`}
          alt="user 1 img"
          className="h-6 absolute inset-0 left-2 top-[10px]"
        />
      </div>
    </div>
  );
};
//
export default Search;
