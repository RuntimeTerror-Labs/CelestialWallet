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

    addContact(state, action) {
      state.contacts.push(action.payload);
    },
  },
});

export const { setContacts, addContact } = contactsSlice.actions;

export default contactsSlice.reducer;
