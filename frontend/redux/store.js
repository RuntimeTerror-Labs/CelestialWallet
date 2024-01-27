"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import modalReducer from "./slice/modalSlice";
import signupReducer from "./slice/signupSlice";
import contactReducer from "./slice/contactsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    signup: signupReducer,
    contacts: contactReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
