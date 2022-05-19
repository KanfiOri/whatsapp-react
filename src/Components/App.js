import React, { useState, useEffect } from "react";
import ContactList from "./ContactList";
import MessagesList from "./MessagesList";
import "../css/app.css";

export const ContactContext = React.createContext();
const LOCAL_STORAGE_KEY = "whatsapp-react.KANFI";

function App() {
  const [contacts, setContacts] = useState(() => {
    const contactJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (contactJSON == null) {
      return contactNames;
    } else {
      return JSON.parse(contactJSON);
    }
  });
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedContactId, setSelectedContactId] = useState();

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const contactContextValue = {
    handleContactSelect,
    handleAddMessage,
    selectedContact,
    handleSearchName,
  };

  function handleSearchName(letters) {
    let newContacts = contactNames;
    newContacts = newContacts.filter((contact) =>
      contact.name.toLowerCase().includes(letters.toLowerCase())
    );
    setContacts(newContacts);
  }

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
  {
    id: 6,
    name: "Adi Brettler",
    messages: [],
  },
  {
    id: 7,
    name: "Ofri Wasser",
    messages: [],
  },
  {
    id: 8,
    name: "N",
    messages: [],
  },
];
