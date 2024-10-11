import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";

const ChatLayout = () => {
  return (
    // <div className="w-[100%] md:w-[70%] h-screen">
    //   <ChatHeader />
    //   <ChatWindow />

    //   <ChatInput />
    // </div>
    <div className="w-full md:w-[70%] h-screen flex flex-col">
      {/* Chat Header - Fixed at the top */}
      <div className="flex-shrink-0">
        <ChatHeader />
      </div>

      {/* Chat Window - Takes up the remaining available space */}
      <div className="flex-grow overflow-y-auto">
        <ChatWindow />
      </div>

      {/* Chat Input - Fixed at the bottom */}
      <div className="flex-shrink-0">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatLayout;
