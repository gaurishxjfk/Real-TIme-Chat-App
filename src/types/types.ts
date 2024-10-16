export interface ChatObject {
  messageId: string;
  senderId: string;
  content: string;
  messageType: string;
  mediaUrl: string | null;
  createdAt: string | Date;
  isRead: boolean;
  isTyping: boolean;
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  profile_image: string;
}

export interface LoginrUserData {
  username: string;
  password: string;
}

export interface Users {
  username: string;
  email?: string;
  user_id: string;
  status: string;
  last_active_at: Date;
}

export interface AppState {
  chatData: [] | ChatObject[];
  addChat: (chat: ChatObject) => void;
  userData: ParticipantObj[];
  loading: boolean;
  isLoggedIn: boolean;
  selectedReceiver: ParticipantObj | null;
  error: string | null;
  lastCursor: null | Date;
  loggedInUser: null | any;
  registerUser: (userData: RegisterUserData) => Promise<void>;
  loginUser: (userData: LoginrUserData) => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  checkIfLoggedIn: () => void;
  selectReceiver: (user: ParticipantObj) => void;
  createMessage: (msgObj:  FormData) => Promise<void>;
  fetchParticipantMessage: (userIds: UserIDs, limit?: number) => Promise<void>;
  getParticipants: (userId : string) => Promise<void>;
  clearSelectedReceiver: () => void;
}


export interface UserIDs {
  senderId: string;
  recieverId: string;
}

export interface ParticipantObj {
  username: string,
  user_id: string,
  id?: string,
  status: string,
  createdAt:  Date,
  content: string
  last_active_at: Date
  senderId: string;
  profile_image?: string
} 

export interface UserCardProps {
  id: string;
  username: string;
  lastSeen: Date;
  lastMessage: string;
  profile_image?: string
  onClick?: () => void;
}

export interface CreateMessageObj {
  senderId: string | undefined;
  recieverId: string | undefined;
  content: string;
  messageType: string;
  mediaUrl: string | null;
}

export interface LoggedInUser {
  username: string;
  email: string;
  id: string;
}
