
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatWindow from './ChatWindow'

const ChatLayout = () => {
  return (
    <div className='w-[70%] h-screen'>
        <ChatHeader />
        <ChatWindow />
        <ChatInput />
    </div>
  )
}

export default ChatLayout