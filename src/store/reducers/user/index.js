import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  picture: null,
  pages: [],
  jwt: null,
  subscriptions: null,
  role: null,
  facebookId: null,
  threadId: null,
  assistantMessages: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => initialState,
    setUser: (_, action) => action.payload.user,
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPicture: (state, action) => {
      state.picture = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setJwt: (state, action) => {
      state.jwt = action.payload;
    },
    setSubscription: (state, action) => {
      state.subscriptions = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setThreadId: (state, action) => {
      state.threadId = action.payload;
    },
    setMessages: (state, action) => {
      state.assistantMessages = action.payload;
    },
    addMessage: (state, action) => {
      state.assistantMessages?.unshift(action.payload);
    },
    addOldMessages: (state, action) => {
      state.assistantMessages.push(...action.payload);
    },
    updateMessageContent: (state, action) => {
      const { id, newContent } = action.payload;
      const message = state.assistantMessages?.find((msg) => msg.id === id);
      if (message) {
        message.content += newContent;
      }
    },
    setUserPicture: (state, action) => {
      state.picture = action.payload;
    },
  },
});

export const {
  setName,
  setEmail,
  setPicture,
  setPages,
  setJwt,
  setUser,
  resetState,
  setThreadId,
  setMessages,
  updateMessageContent,
  addMessage,
  addOldMessages,
  setUserPicture,
  setSubscription,
} = userSlice.actions;

export default userSlice.reducer;
