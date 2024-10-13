import clsx from "clsx";
import ChatLayout from "./components/chat_layout/ChatLayout";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/auth/Login";
import { appStore } from "./store/store";
import { useEffect } from "react";
import { useSocketStore } from "./store/socketStore";
import { SignedIn, useUser } from "@clerk/clerk-react";

function App() {
  const { checkIfLoggedIn, registerUser, loggedInUser, selectedReceiver } =
    appStore((state) => state);
  const { initializeSocket, disconnectSocket } = useSocketStore();
  const { isSignedIn, user } = useUser();

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

  const handleRegister = async () => {
    if (user && user.primaryEmailAddress?.emailAddress && user.username) {
      const username = user.username;
      const email = user.primaryEmailAddress?.emailAddress;
      const password = "12341234";
      const profile_image = user?.imageUrl
      // await loginUser({
      //   username,
      //   password,
      // });
      await registerUser({
        username,
        email,
        password,
        profile_image
      });
    }
  };

  useEffect(() => {
    handleRegister();
  }, [user, user?.username]);

  if (!isSignedIn) {
    return <Login />;
  }

  return (
    <div className={clsx("bg-slate-200 flex", "h-screen overflow-y-hiddden")}>
      <SignedIn>
        <Sidebar />
        <div
          className={clsx(
            selectedReceiver?.user_id &&
              "absolute w-full md:relative md:w-[70%]"
          )}
        >
          {selectedReceiver && selectedReceiver.user_id && <ChatLayout />}
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
