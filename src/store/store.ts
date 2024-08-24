import { create } from "zustand";
import { AppState, ChatObject } from "../types/types";

export const appStore = create<AppState>()((set) => ({
  chatData: [],
  addChat: (chat) => set((state) => ({ chatData: [...state.chatData, chat] })),
  loading: false,
  userData: [],
  selectedReceiver: null,
  error: null,
  isLoggedIn: false,
  loggedInUser: null,
  selectReceiver: (user) => {
    set({ selectedReceiver: user, chatData: [] });
  },

  //createMessage
  createMessage: async (msgObj) => {
    const { senderId, recieverId, content, messageType, mediaUrl } = msgObj;
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        "http://localhost:3000/users/createmessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId,
            recieverId,
            content,
            messageType,
            mediaUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("message creation failed");
      }

      const responseData = await response.json();
      const chatsData: ChatObject[] = responseData.body;
      set({ loading: false, chatData: chatsData });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ loading: false, error: error });
    }
  },

  //fetch message
  fetchParticipantMessage: async (userIds, limit) => {
    const { senderId, recieverId } = userIds;
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `http://localhost:3000/users/fetchchats/${senderId}/${recieverId}?limit=${
          limit || undefined
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("message creation failed");
      }
      const chatsData = await response.json();
      console.log(chatsData);

      set((state) => {
        // Filter out any duplicate chats based on a unique identifier, such as 'id'
        const newChats = chatsData.filter(
          (newChat: ChatObject) =>
            !state.chatData.some(
              (existingChat) => existingChat.messageId === newChat.messageId
            )
        );

        return {
          loading: false,
          chatData: [...newChats, ...state.chatData],
        };
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ loading: false, error: error });
    }
  },

  getParticipants: async (userId) => {
    const senderId = userId;
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `http://localhost:3000/users/fetchparticipants/${senderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("getting participants failed");
      }
      const participants = await response.json();
      console.log(participants);
      set({ loading: false, userData: participants });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ loading: false, error: error });
    }
  },

  //Register New User
  registerUser: async (userObj) => {
    const { username, email, password } = userObj;
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:3000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      set({ loading: false });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ loading: false, error: error });
    }
  },

  //Register New User
  loginUser: async (userObj) => {
    const { username, password } = userObj;
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        set({ error: error.error });
        throw new Error(JSON.stringify(error));
      }
      const user = await response.json();
      localStorage.setItem("userObj", JSON.stringify(user));

      set({ loading: false, isLoggedIn: true, loggedInUser: user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("rairyad", error);
      set({ loading: false });
    }
  },

  checkIfLoggedIn: () => {
    const userString = localStorage.getItem("userObj");
    const user = userString ? JSON.parse(userString) : null;
    set({ isLoggedIn: Boolean(user?.id), loggedInUser: user });
  },

  //Fetch All Users
  fetchAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:3000/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error in getting users");
      }

      const users = await response.json();
      set({ loading: false, userData: users });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ loading: false, error: error });
    }
  },
}));
