import { useEffect } from "react";
import { appStore } from "../../store/store";
import Filter from "./Filter";
import Search from "./Search";
import UserCard from "./UserCard";
// const totalChats = Array.from(new Array(12)).map((_, j) => j);
const Sidebar = () => {
  const {
    userData,
    selectReceiver,
    loggedInUser,
    getParticipants,
    checkIfLoggedIn,
  } = appStore((state) => state);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    console.log("dog",loggedInUser)
    if (loggedInUser && loggedInUser?.id) {
      getParticipants(loggedInUser.id);
    }
  }, [loggedInUser]);

  return (
    <div className=" md:block w-[30%]  bg-white relative h-[40%]">
      <div className="bg-white flex sm:flex-col">
        <Search />
        <Filter />
      </div>

      <div className="relative flex flex-col gap-[1px] custom-scrollbar scroll-smooth overflow-y-scroll h-[90vh] bg-slate-200 sm:pt-12">
        {userData.length > 0 &&
          userData.map((user, j) => (
            <UserCard
              key={user.user_id}
              id={j}
              username={user.username}
              lastSeen={user.last_active_at}
              onClick={() => selectReceiver(user)}
            />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
