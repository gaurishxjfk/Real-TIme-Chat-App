import { useEffect } from "react";
import { appStore } from "../store/store";
import { ChatObject } from "../types/types";
import { useSocketStore } from "../store/socketStore";

const useListenMessages = () => {
  const { socket } = useSocketStore();
  const { addChat } = appStore((state) => state);
  useEffect(() => {
    socket?.on("newMessage", (newMessage: ChatObject) => {
      addChat(newMessage);
    });

    return () => socket?.off("newMessage");
  }, [socket, addChat]);
};

export default useListenMessages;
