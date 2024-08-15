import Filter from "./Filter";
import Search from "./Search";
import UserCard from "./UserCard";
const totalChats = Array.from(new Array(12)).map((_, j) => j);
const Sidebar = () => {
  return (
    <div className=" w-[30%]  bg-white relative">
      <Search />
      <Filter />
      <div className="relative flex flex-col gap-[1px] custom-scrollbar overflow-y-scroll h-[90vh] bg-slate-200 pt-12">
        {totalChats.map((i) => (
          <UserCard key={i} id={i} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
