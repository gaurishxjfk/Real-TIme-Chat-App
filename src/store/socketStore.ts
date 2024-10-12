import { create } from "zustand";
import { SocketStore } from "../types/socket.store";
import { io } from "socket.io-client";

const domainUrl = import.meta.env.VITE_DOMAIN_URL

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  onlineUsers: [],
  initializeSocket: (userId: string) => {
    const socket = io(domainUrl, {
      query: { userId },
    });
    set({ socket });

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },
  setOnlineUsers: (users: any[]) => set({ onlineUsers: users }),
  disconnectSocket: () => {
    set((state) => {
      if (state.socket) {
        state.socket.close();
        return { socket: null, onlineUsers: [] };
      }
      return state;
    });
  },
}));
