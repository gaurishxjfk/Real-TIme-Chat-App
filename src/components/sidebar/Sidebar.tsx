import { useEffect, useState } from "react";
import { appStore } from "../../store/store";
import Search from "./Search";
import UserCard from "./UserCard";
import { UserButton } from "@clerk/clerk-react";
import { sortDataByDate } from "../../utils/helperfunctions";
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
  }, [searchQuery, userData]);
  return (
    <div className="w-full md:block md:w-[30%]  bg-white relative  border-r-[1px] border-gray-300">
      <div className="flex w-full justify-between items-center">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="scale-125 bg-[#2d3fdc] mx-4 flex items-center p-[1px] rounded-full">
          <UserButton />
        </div>
      </div>

      <div className="relative flex flex-col gap-[1px] custom-scrollbar scroll-smooth overflow-y-scroll h-[90vh] bg-slate-200  border-t-[1px] border-gray-300">
        {userData.length > 0 &&
          sortDataByDate(filteredUserData).map((user) => (
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
