import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",

  initialState: {
    contacts: [],
    originalContacts: [],
  },

  reducers: {
    setOriginalContacts(state, action) {
      state.originalContacts = action.payload;
    },

    addOriginalContact(state, action) {
      state.originalContacts.push(action.payload);
    },

    setContacts(state, action) {
      state.contacts = action.payload;
    },

    addContact(state, action) {
      state.contacts.push(action.payload);
    },
  },
});

export const {
  setContacts,
  addContact,
  setOriginalContacts,
  addOriginalContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
