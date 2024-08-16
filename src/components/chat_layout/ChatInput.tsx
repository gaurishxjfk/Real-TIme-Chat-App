import { useRef, useState } from "react";
import { appStore } from "../../store/store";

const ChatInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [chatInp, setChatInp] = useState("");
  const { addChat, chatData } = appStore((state) => state);

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const sendChat = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if ("key" in event && event.key !== "Enter") {
      return;
    }
    const chatObj = {
      id: "msg" + chatData.length + 1,
      sender: "Krishna",
      receiver: "Ravi",
      message: selectedFile ? selectedFile : chatInp,
      media: selectedFile ? true : false,
      timestamp: new Date().getTime.toString(),
      status: "delivered",
    };
    addChat(chatObj);
    setChatInp("");
  };
  return (
    <div className="bg-white p-2 flex items-center justify-center relative border-t">
      <div className="bg-gray-200 relative w-[95%] min-h-[6vh] flex items-center justify-start rounded-lg">
        {selectedFile ? (
          selectedFile.includes("video") ? (
            <video
              src={selectedFile}
              controls
              className="max-w-full max-h-64"
            />
          ) : (
            <div className="relative m-2 ">
              <img src={selectedFile} alt="Selected" className="max-h-32" />
              <button
                onClick={() => setSelectedFile(null)}
                className="absolute -top-2 -right-2 bg-gray-50 rounded-full w-6 h-6 "
              >
                X
              </button>
            </div>
          )
        ) : (
          <input
            type="search"
            placeholder="Type your message here"
            className="outline-none w-[80%] bg-transparent px-4 "
            value={chatInp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChatInp(e.target?.value)
            }
            onKeyDown={sendChat}
          />
        )}

        <div className="flex  absolute items-center gap-2 right-12">
          <button onClick={handleAttachmentClick}>
            <img src={`/attachment.svg`} alt="attachment" className="h-6 " />
          </button>
          <button onClick={sendChat}>
            <img src={`/send.svg`} alt="send" className="h-8  " />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatInput;
