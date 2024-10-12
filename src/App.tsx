import clsx from "clsx";
import ChatLayout from "./components/chat_layout/ChatLayout";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/auth/Login";
import { appStore } from "./store/store";
import { useEffect } from "react";
import { useSocketStore } from "./store/socketStore";

function App() {
  const { checkIfLoggedIn, isLoggedIn, loggedInUser, selectedReceiver } =
    appStore((state) => state);
  const { initializeSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    if (loggedInUser && loggedInUser?.id) {
      initializeSocket(loggedInUser.id);
    }
    return () => {
      disconnectSocket();
    };
  }, [loggedInUser?.id]);

  return (
    <div className={clsx("bg-slate-200 flex", "h-screen overflow-y-hiddden")}>
      {!isLoggedIn && <Login />}
      <Sidebar />
      <div className={clsx(
        selectedReceiver?.user_id && "absolute w-full md:relative md:w-[70%]"
      )}>
        {selectedReceiver && selectedReceiver.user_id && <ChatLayout />}
      </div>
    </div>
  );
}

export default App;
