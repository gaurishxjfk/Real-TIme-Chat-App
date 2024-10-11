import { useRef, useState } from "react";
import { appStore } from "../../store/store";

const ChatInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [chatInp, setChatInp] = useState("");
  const { createMessage, selectedReceiver, loggedInUser } = appStore(
    (state) => state
  );

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const sendChat = () => {
    if (!selectedFile && chatInp.length < 1) return;
    const recieverId = selectedReceiver?.user_id;
    if (recieverId && loggedInUser && loggedInUser?.id) {
      const formData = new FormData();
      formData.append("senderId", loggedInUser?.id);
      formData.append("recieverId", recieverId);
      formData.append("content", selectedFile ? "NA" : chatInp);
      formData.append("messageType", selectedFile ? "media" : "text");
      formData.append("image", selectedFile ? selectedFile : null);
      createMessage(formData);
      setChatInp("");
      setSelectedFile(null);
    }
  };
  const fileURL = selectedFile ? URL.createObjectURL(selectedFile) : null;
  return (
    <div className="bg-white p-2 py-3 flex items-center justify-center  border-t">
      <div className="bg-gray-200 relative w-[95%] min-h-[6vh] flex items-center justify-start rounded-lg">
        {selectedFile && fileURL ? (
          fileURL.includes("video") ? (
            <video src={fileURL} controls className="max-w-full max-h-64" />
          ) : (
            <div className="relative m-2 ">
              <img src={fileURL} alt="Selected" className="max-h-32" />
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
            onKeyDown={(e) => "key" in e && e.key === "Enter" && sendChat()}
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
