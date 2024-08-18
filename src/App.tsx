import clsx from "clsx";
import ChatLayout from "./components/chat_layout/ChatLayout";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/auth/Login";
import { appStore } from "./store/store";
import { useEffect } from "react";

function App() {
  const { checkIfLoggedIn, isLoggedIn, selectedReceiver } = appStore(
    (state) => state
  );
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div className={clsx("bg-slate-200 flex", "h-screen overflow-y-hiddden")}>
      {!isLoggedIn && <Login />}
      <Sidebar />
      {selectedReceiver && selectedReceiver.user_id && <ChatLayout />}
    </div>
  );
}

export default App;
