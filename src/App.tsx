import ChatLayout from "./components/chat_layout/ChatLayout";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="bg-slate-200 flex">
      <Sidebar />
      <ChatLayout />
    </div>
  );
}

export default App;
