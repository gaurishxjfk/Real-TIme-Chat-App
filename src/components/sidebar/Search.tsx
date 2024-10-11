import clsx from "clsx";

const Search = () => {
  return (
    <div className="py-3 flex justify-center items-center ">
      <div
        className={clsx(
          "relative ",
          "p-2 sm:p-0 sm:w-[90%] sm:h-[6vh] rounded-lg ",
          "border-[1.5px] border-slate-300 bg-slate-100 "
        )}
      >
        <input
          type="search"
          className={clsx(
            "w-full bg-transparent h-[6vh] pl-10 pr-2",
            "outline-none text-[18px] hidden sm:flex"
          )}
          placeholder="Search"
        />
        <img
          src={`/search.svg`}
          alt="user 1 img"
          className="h-6 sm:absolute inset-0 sm:left-2 sm:top-[10px] mx-auto sm:mx-0"
        />
      </div>
    </div>
  );
};
//
export default Search;
