import { clsx } from "clsx";
import React, { useState } from "react";
import { UserCardProps } from "../../types/types";

const UserCard: React.FC<UserCardProps> = ({
  id,
  username,
  lastSeen,
  onClick,
}) => {
  const lastSeenDate = new Date(lastSeen);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - lastSeenDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const [toggel, setToggle] = useState(true);
  return (
    <div onClick={onClick}>
      <div
        className={clsx(
          "flex justify-center  bg-white hover:bg-gray-100 gap-3 p-4 cursor-pointer",
          toggel && "border-4 border-primary border-y-0 border-r-0"
        )}
        onClick={() => setToggle(!toggel)}
      >
        <img
          src={`/user/user_${id % 2 === 0 ? 2 : 1}.svg`}
          alt="user 1 img"
          className="h-12 w-12"
        />
        <div className="hidden md:flex flex-col">
          <div className="flex w-full gap-2 text-[16px]">
            <h3 className="font-semibold">{username}</h3>
            <h4 className="text-slate-400">
              <span>•</span> {diffDays} days
            </h4>
          </div>
          <div>
            <p className="line-clamp-3 text-[16px] ">
              <span className="font-semibold text-slate-500 tracking-tight ">
                Krishna:{" "}
              </span>{" "}
              This is the msg that was typed to show in the ui for chat card
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
