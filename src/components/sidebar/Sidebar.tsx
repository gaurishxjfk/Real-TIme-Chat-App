import { useEffect, useState } from "react";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUserData, setFilteredUserData] = useState(userData);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    if (loggedInUser && loggedInUser?.id) {
      getParticipants(loggedInUser.id);
    }
  }, [loggedInUser]);

  useEffect(() => {
    const filteredData = userData.filter(({ username }) =>
      username.includes(searchQuery)
    );
    setFilteredUserData(filteredData);
  }, [searchQuery]);

  return (
    <div className="w-full md:block md:w-[30%]  bg-white relative  border-r-[1px] border-gray-300">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="relative flex flex-col gap-[1px] custom-scrollbar scroll-smooth overflow-y-scroll h-[90vh] bg-slate-200  border-t-[1px] border-gray-300">
        {userData.length > 0 &&
          filteredUserData.map((user, j) => (
            <UserCard
              key={user.user_id}
              id={user.senderId}
              username={user.username}
              lastSeen={user.createdAt}
              lastMessage={user.content === "NA" ? "Media" : user.content}
              onClick={() => selectReceiver(user)}
            />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
