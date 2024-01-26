"use client";

import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./slice/contactsSlice";
import signupReducer from "./slice/signupSlice";

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    signup: signupReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
