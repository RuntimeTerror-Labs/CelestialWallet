import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",

  initialState: {
    contacts: [],
  },

  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },
  },
});

export const { setContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
