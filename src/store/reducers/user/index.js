import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  picture: null,
  pages: [],
  jwt: null,
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
} = userSlice.actions;

export default userSlice.reducer;
