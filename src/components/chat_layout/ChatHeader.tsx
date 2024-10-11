import clsx from "clsx";
import { appStore } from "../../store/store";
import { getLastSeenText } from "../../utils/helperfunctions";

const ChatHeader = () => {
  const { selectedReceiver } = appStore((state) => state);
  return (
    <>
      <div
        className={clsx(
          "w-full bg-white flex px-4 gap-4 py-2 ",
          "border-b-[1px] border-gray-300"
        )}
      >
        <img
          src={`/user/user_${1}.svg`}
          alt="user 1 img"
          className="h-12 w-12"
        />
        <div className="flex flex-col">
          <div className="flex w-full gap-2 text-[16px] items-center">
            <h3 className="font-semibold">{selectedReceiver?.username} </h3>
            <span
              className={clsx(
                " font-extrabold text-3xl -mt-2",
                selectedReceiver?.status === "online"
                  ? "text-green-600"
                  : "text-white"
              )}
            >
              •
            </span>
          </div>
          <div>
            <p className=" text-[16px] text-gray-600 ">
              {selectedReceiver?.last_active_at &&
                getLastSeenText(new Date(selectedReceiver?.last_active_at))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
