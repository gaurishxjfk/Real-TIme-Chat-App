import { create } from "zustand";
import { ChatObject } from "../types/types";
import ChatData from './ChatData.json'

interface BearState {
  chatData: ChatObject[];
  addChat: (chat: ChatObject) => void;
}

export const appStore = create<BearState>()((set) => ({
  chatData: [...ChatData],
  addChat: (chat) => set((state) => ({ chatData: [...state.chatData, chat] })),
}));
