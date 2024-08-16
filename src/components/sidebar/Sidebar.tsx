import Filter from "./Filter";
import Search from "./Search";
import UserCard from "./UserCard";
const totalChats = Array.from(new Array(12)).map((_, j) => j);
const Sidebar = () => {
  return (
    <div className=" md:block w-[30%]  bg-white relative">
      <div className="bg-white flex sm:flex-col">
        <Search />
        <Filter />
      </div>

      <div className="relative flex flex-col gap-[1px] custom-scrollbar scroll-smooth overflow-y-scroll h-[90vh] bg-slate-200 sm:pt-12">
        {totalChats.map((i) => (
          <UserCard key={i} id={i} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
