import ChatData from "../../store/ChatData.json";
import clsx from "clsx";

const ChatWindow = () => {
  return (
    <div className="bg-white h-auto py-8 px-4">
      {ChatData.map((msg) => (
        <div
          key={msg.id}
          className={clsx(
            "p-3 border rounded-xl w-fit ",
            msg.sender == "Krishna" ? "bg-primary text-white ml-auto" : "bg-gray-200"
          )}
        >
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
