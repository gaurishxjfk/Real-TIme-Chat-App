export interface ChatObject {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  media: boolean;
  timestamp: string | Date;
  status: string;
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

export interface LoginrUserData {
  username: string;
  password: string;
}

export interface Users {
  username: string;
  email: string;
  user_id: string;
  status: string;
  last_active_at: Date;
}

export interface AppState {
  chatData: ChatObject[];
  addChat: (chat: ChatObject) => void;
  userData: Users[];
  loading: boolean;
  isLoggedIn: boolean;
  selectedReceiver: Users | null;
  error: string | null;
  registerUser: (userData: RegisterUserData) => Promise<void>;
  loginUser: (userData: LoginrUserData) => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  checkIfLoggedIn: () => void;
  selectReceiver: (user: Users) => void;
  createMessage: (msgObj: CreateMessageObj) => Promise<void>;
}

export interface UserCardProps {
  id: number;
  username: string;
  lastSeen: Date;
  onClick?: () => void;
}

export interface CreateMessageObj {
  senderId: string;
  content: string;
  messageType: string;
  mediaUrl: string | null;
}
