import { useEffect } from "react";
import { appStore } from "../../store/store";
import Search from "./Search";
import UserCard from "./UserCard";
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
    if (loggedInUser && loggedInUser?.id) {
      getParticipants(loggedInUser.id);
    }
  }, [loggedInUser]);

  return (
    <div className=" md:block w-[30%]  bg-white relative  border-r-[1px] border-gray-300">
      <Search />

      <div className="relative flex flex-col gap-[1px] custom-scrollbar scroll-smooth overflow-y-scroll h-[90vh] bg-slate-200  border-t-[1px] border-gray-300">
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
