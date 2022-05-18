import React, { useState } from "react";
import ContactList from "./ContactList";
import MessagesList from "./MessagesList";
import "../css/app.css";

export const ContactContext = React.createContext();

function App() {
  const [contacts, setContacts] = useState(contactNames);
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedContactId, setSelectedContactId] = useState();

  const contactContextValue = {
    handleContactSelect,
    handleAddMessage,
    selectedContact,
  };

  function handleAddMessage(id, message) {
    const newContacts = [...contacts];
    const index = contacts.findIndex((c) => c.id === id);
    newContacts[index].messages.push(message);
    setContacts(newContacts);
  }

  function handleContactSelect(id) {
    const selectedContactById = contacts.find((contact) => contact.id === id);
    setSelectedContact(selectedContactById);
    setSelectedContactId(id);
  }

  return (
    <ContactContext.Provider value={contactContextValue}>
      <ContactList contacts={contacts} />
      <MessagesList id={selectedContactId} />
    </ContactContext.Provider>
  );
}

export default App;

const contactNames = [
  {
    id: 1,
    name: "Ariel Dodi",
    messages: [],
  },
  {
    id: 2,
    name: "Ori Kanfi",
    messages: [],
  },
  {
    id: 3,
    name: "Rom Shech",
    messages: [],
  },
  {
    id: 4,
    name: "Adam Knizhnik",
    messages: [],
  },
  {
    id: 5,
    name: "Nitay Yona",
    messages: [],
  },
];
