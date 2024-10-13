import { clsx } from "clsx";
import React, { useState } from "react";
import { UserCardProps } from "../../types/types";
import { appStore } from "../../store/store";
import { formatLastActive } from "../../utils/helperfunctions";

const UserCard: React.FC<UserCardProps> = ({
  id,
  username,
  lastSeen,
  onClick,
  lastMessage,
  profile_image
}) => {

  const { loggedInUser } = appStore(state => state)
  const [toggel, setToggle] = useState(Boolean(lastMessage));
  return (
    <div onClick={onClick}>
      <div
        className={clsx(
          "flex bg-white hover:bg-gray-100 gap-3 p-4 cursor-pointer",
          toggel && "border-4 border-primary border-y-0 border-r-0"
        )}
        onClick={() => setToggle(!toggel)}
      >
        <img
          src={profile_image ?? `/user/user_${1 % 2 === 0 ? 2 : 1}.svg`}
          alt="user 1 img"
          className="h-12 w-12 rounded-full border border-blue-500"
        />
        <div className="flex flex-col w-full ">
          <div className="flex w-full text-[16px] justify-between">
            <h3 className="font-semibold">{username}</h3>
            <h4 className="text-slate-400  ml-auto">
              {lastSeen && formatLastActive(lastSeen)}
            </h4>
          </div>
          <div>
            <p className={clsx("line-clamp-3 text-[16px] ",!lastMessage && "text-slate-400" )}>
              <span className="font-semibold text-slate-500 tracking-tight ">
                {loggedInUser?.id === id && "You" }
              </span>{" "}
              {lastMessage ?? "Start new Chat.."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
