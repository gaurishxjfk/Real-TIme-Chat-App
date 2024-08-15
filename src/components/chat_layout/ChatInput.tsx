import { useRef } from "react";

const ChatInput = () => {
  const fileInputRef = useRef(null);

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log("Selected files:", files);
    // Handle file upload logic here
    // You can upload the files to a server or display them in the chat UI
  };
  return (
    <div className="bg-white p-2 flex items-center justify-center relative border-t">
      <div className="bg-gray-200 w-[95%] h-[6vh] flex items-center justify-center rounded-lg">
        <input
          type="search"
          placeholder="Type your message here"
          className="outline-none w-full bg-transparent px-4"
        />
        <div className="flex  absolute items-center gap-2 right-12">
          <button onClick={handleAttachmentClick}>
            <img src={`/attachment.svg`} alt="attachment" className="h-6 " />
          </button>
          <button>
            {" "}
            <img src={`/send.svg`} alt="send" className="h-8  " />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          onChange={handleFileChange}
          multiple
        />
      </div>
    </div>
  );
};

export default ChatInput;
