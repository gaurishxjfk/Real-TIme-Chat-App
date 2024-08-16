import clsx from "clsx";
import { appStore } from "../../store/store";

const ChatWindow = () => {
  const { chatData } = appStore((state) => state);

  return (
    <div className="bg-white h-auto py-8 px-2 md:px-4">
      {chatData.map((msg) => (
        <div
          key={msg.id}
          className={clsx(
            "p-2 md:p-3 border rounded-xl w-fit my-2 shadow-md",
            msg.sender == "Krishna"
              ? "bg-primary text-white ml-auto"
              : "bg-gray-200"
          )}
        >
          {msg.media ? (
            <>
              {msg.message.includes("video") ? (
                <video
                  src={msg.message}
                  controls
                  className="max-w-full max-h-64"
                />
              ) : (
                <img src={msg.message} alt="Selected" className="max-h-32" />
              )}
            </>
          ) : (
            msg.message
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
