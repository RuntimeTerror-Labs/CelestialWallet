"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import modalReducer from "./slice/modalSlice";
import signupReducer from "./slice/signupSlice";
import contactReducer from "./slice/contactsSlice";
import dataReducer from "./slice/dataSlice";
import changeEmailReducer from "./slice/changeEmailSlice";
import transferReducer from "./slice/transferSlice";
import forgotPasswordReducer from "./slice/forgotPasswordSlice";
import startSavingReducer from "./slice/startSavingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    signup: signupReducer,
    contacts: contactReducer,
    data: dataReducer,
    changeEmail: changeEmailReducer,
    transfer: transferReducer,
    forgotPassword: forgotPasswordReducer,
    startSaving: startSavingReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
