import clsx from "clsx";
import { appStore } from "../../store/store";
import { useEffect } from "react";

const ChatWindow = () => {
  const { chatData, selectedReceiver, fetchParticipantMessage, loggedInUser } =
    appStore((state) => state);

  useEffect(() => {
    if (loggedInUser?.id && selectedReceiver?.user_id) {
      fetchParticipantMessage({
        senderId: loggedInUser.id,
        recieverId: selectedReceiver?.user_id,
      });
    }
  }, [selectedReceiver]);

  return (
    <div className="bg-white h-[80%] py-8 px-2 md:px-4 overflow-y-auto custom-scrollbar">
      {chatData.map((msg) => (
        <div
          key={msg.messageId}
          className={clsx(
            "p-2 md:p-3 border rounded-xl w-fit my-2 shadow-md",
            msg.senderId == loggedInUser?.id
              ? "bg-primary text-white ml-auto"
              : "bg-gray-200"
          )}
        >
          {msg.mediaUrl !== null ? (
            <>
              {msg.mediaUrl.includes("video") ? (
                <video
                  src={msg.mediaUrl}
                  controls
                  className="max-w-full max-h-64"
                />
              ) : (
                <img src={msg.mediaUrl} alt="Selected" className="max-h-32" />
              )}
            </>
          ) : (
            msg.content
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
