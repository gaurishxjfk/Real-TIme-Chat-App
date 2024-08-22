import clsx from "clsx";
import { appStore } from "../../store/store";
import { useEffect, useRef, useState } from "react";

const ChatWindow = () => {
  const { chatData, selectedReceiver, fetchParticipantMessage, loggedInUser } =
    appStore((state) => state);

  const msgEndRef = useRef<HTMLDivElement | null>(null);
  const firstMsgRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  function getMsgs() {
    if (loggedInUser?.id && selectedReceiver?.user_id) {
      fetchParticipantMessage(
        {
          senderId: loggedInUser.id,
          recieverId: selectedReceiver?.user_id,
        },
        chatData.length > 0 ? chatData[0].createdAt : undefined
      );
    }
  }

  useEffect(() => {
    getMsgs();
  }, [selectedReceiver]);

  useEffect(() => {
    if (chatData.length > 0 && msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  function scrollToElementWithMargin(element) {
    const topOffset = window.innerHeight * 0.2; // 20% of the viewport height
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementTop - topOffset;
    console.log("called!!!");
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // useEffect(() => {
  //   if (chatData.length > 0 && firstMsgRef.current) {
     
      
  //   }
  // }, [chatData]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (e.currentTarget.scrollTop === 0 && hasMore) {
      //getMsgs();
      console.log("TOPP Scoreee!!!");
      scrollToElementWithMargin(msgEndRef.current)
    }
  };
console.log(chatData)
  return (
    <div
      className="bg-white h-[80%] py-8 px-2 md:px-4 overflow-y-auto custom-scrollbar"
      onScroll={handleScroll}
    >
      <button onClick={() => getMsgs()}>Load More</button>
      {chatData.map((msg, index) => (
        <div
          key={msg.messageId}
          ref={index === 0 ? firstMsgRef : null}
          className={clsx(
            "p-2 md:p-3 border rounded-xl w-fit my-6 shadow-md",
            msg.senderId == loggedInUser?.id
              ? "bg-primary text-white ml-auto"
              : "bg-gray-200"
          )}
        >
          {msg.mediaUrl !== null ? (
            <>
              {msg?.mediaUrl?.includes("video") ? (
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
      <div ref={msgEndRef}></div>
    </div>
  );
};

export default ChatWindow;
