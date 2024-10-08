export interface SocketStore {
    socket: any;
    onlineUsers: any[];
    initializeSocket: (userId: string) => void;
    setOnlineUsers: (users: any[]) => void;
    disconnectSocket: () => void;
  }