import { create } from "zustand";
import { AppState } from "../types/types";

export const appStore = create<AppState>()((set, get) => ({
  chatData: [],
  addChat: (chat) => set((state) => ({ chatData: [...state.chatData, chat] })),
  loading: false,
  userData: [],
  selectedReceiver: null,
  error: null,
  isLoggedIn: false,
  loggedInUser: null,
  lastCursor: null,

   // clears selected reciver obj
   clearSelectedReceiver:  () => {
    set({ selectedReceiver: null, chatData: [], lastCursor: null });
  },

  // on click of user, set user and load their conversation
  selectReceiver: async (user) => {
    const senderId = get().loggedInUser?.id;
    const recieverId = user.user_id;
    set({ selectedReceiver: user });
    set({ loading: true, chatData: [], lastCursor: null });
    const fetchParticipantMessage = get().fetchParticipantMessage;
    if (senderId && recieverId) {
      await fetchParticipantMessage({ senderId, recieverId });
    }
    set({ loading: false });
  },

  //createMessage
  createMessage: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        "http://localhost:3000/users/createmessage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("message creation failed");
      }
      const chatsData = await response.json();

      set({
        loading: false,
        chatData: chatsData.body,
      });

      set({ loading: false });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ loading: false, error: error });
    }
  },

  //fetch message
  fetchParticipantMessage: async (userIds) => {
    const cursor = get().lastCursor; // Start with no cursor (first page)
    let hasMore = true;
    const limit = 15; // Number of messages to load per request

    if (!hasMore) return;
    const { senderId, recieverId } = userIds;
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `http://localhost:3000/users/fetchchats/${senderId}/${recieverId}?limit=${limit}&cursor=${cursor}`,
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
      hasMore = chatsData.hasMore;
      const existingChats = cursor === null ? [] : get().chatData;
      set({
        loading: false,
        chatData: [...chatsData.messages, ...existingChats],
        lastCursor: chatsData.nextCursor,
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
