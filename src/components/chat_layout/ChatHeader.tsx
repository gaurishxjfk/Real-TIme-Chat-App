import clsx from "clsx";

const ChatHeader = () => {
  return (
    <>
      <div
        className={clsx(
          "w-full bg-white flex p-4 gap-4 py-3",
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
            <h3 className="font-semibold">Krishna </h3>
            <span className="text-green-600 font-extrabold text-3xl -mt-2">
              •
            </span>
          </div>
          <div>
            <p className=" text-[16px] text-gray-600 ">Typing...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
