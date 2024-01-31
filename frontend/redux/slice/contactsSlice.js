import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",

  initialState: {
    ably: null,
    ablyAuth: null,
    selectedPresence: "leave",
    contacts: [],
    messages: [],
    latestMessage: null,
    originalContacts: [],
    selectedContact: null,
  },

  reducers: {
    setAbly(state, action) {
      state.ably = action.payload;
    },

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

    setSelectedContact(state, action) {
      state.selectedContact = action.payload;
    },

    setMessages(state, action) {
      state.messages = action.payload;
    },

    addMessage(state, action) {
      state.messages.push(action.payload);
    },

    setLatestMessage(state, action) {
      state.latestMessage = action.payload;
    },

    setAblyAuth(state, action) {
      state.ablyAuth = action.payload;
    },

    setSelectedPresence(state, action) {
      state.selectedPresence = action.payload;
    },
  },
});

export const {
  setAbly,
  setAblyAuth,
  addContact,
  setContacts,
  addMessage,
  setMessages,
  setLatestMessage,
  setSelectedContact,
  addOriginalContact,
  setOriginalContacts,
  setSelectedPresence,
} = contactsSlice.actions;

export default contactsSlice.reducer;
