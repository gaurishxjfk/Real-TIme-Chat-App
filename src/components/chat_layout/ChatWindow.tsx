import clsx from "clsx";
import { appStore } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import useListenMessages from "../../hooks/useListenMessage";
import { formatTo12HourTime } from "../../utils/helperfunctions";

const ChatWindow = () => {
  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      console.log("bottom");

      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

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
  useListenMessages();
  console.log(chatData);

  useEffect(() => {
    if (!loading) scrollToBottom();
  }, [chatData, loading]);

  // Mock fetch function to get older messages
  const fetchOldMessages = () => {
    setLoading(true);
    // Simulating API call (replace with actual API call)
    if (loggedInUser?.id && selectedReceiver?.user_id) {
      fetchParticipantMessage({
        senderId: loggedInUser.id,
        recieverId: selectedReceiver?.user_id,
      });
    }
  };

  // Function to load more messages when scrolling to the top
  const loadMoreMessages = async () => {
    if (loading) return;

    // Save the current scroll position and height before loading more messages
    const chatWindow = chatWindowRef.current;
    if (chatWindow) {
      fetchOldMessages();

      // After new messages are loaded, adjust the scroll to the previous position
      setTimeout(() => {
        if (chatWindow) {
          console.log("topppppp");
          chatWindow.scrollTop = 10;
        }
      }, 0);

      setLoading(false);
    }
  };

  // Handle scroll event
  const handleScroll = () => {
    const chatWindow = chatWindowRef.current;
    if (chatWindow && chatWindow.scrollTop === 0 && !loading) {
      loadMoreMessages();
    }
  };

  return (
    <div
      ref={chatWindowRef}
      className="bg-white h-full py-8 overflow-y-auto custom-scrollbar flex flex-col"
      onScroll={handleScroll}
    >
      {loading && <div className="text-center">Loading...</div>}

      <div className="w-full px-2 md:px-4 mt-auto">
        {chatData.map((msg) => (
          <div
            key={msg.messageId+loggedInUser?.id}
            className={clsx(
              "p-2 md:p-3 border rounded-xl w-fit my-1.5 shadow-md relative",
              msg.senderId == loggedInUser?.id
                ? "bg-primary text-white ml-auto"
                : "bg-blue-100"
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
            <span className="text-[12px] opacity-75 ml-2">
              {formatTo12HourTime(msg.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
