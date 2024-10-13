import clsx from "clsx";

const Search = ({
  setSearchQuery,
  searchQuery
}: {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string
}) => {
  return (
    <div className="py-3 flex justify-center items-center w-full">
      <div
        className={clsx(
          "relative ",
          "mx-2 p-2 w-full h-[6vh] rounded-lg flex items-center",
          "border-[1.5px] border-slate-300 bg-slate-100 "
        )}
      >
        <input
          type="search"
          className={clsx(
            "w-full bg-transparent",
            "outline-none text-[18px] flex"
          )}
          placeholder="Search"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
        <img
          src={`/search.svg`}
          alt="user 1 img"
          className="h-6 absolute inset-0 right-2 top-1 ml-auto "
        />
      </div>
    </div>
  );
};
//
export default Search;
