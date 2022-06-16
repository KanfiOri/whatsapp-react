import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactList from "./ContactList";
import MessagesList from "./MessagesList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../css/app.css";
import Warper from "./Warper";
import { v4 as uuidv4 } from "uuid";
import { getContacts } from "../api/contacts";

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
  const [logedUser, setLogedUser] = useState("");

  useEffect(() => {
    const test = async () => {
      console.log((await getContacts()).data);
    };

    test();
  }, []);

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

  function handleSignIn(nameInput, passwordInput) {
    console.log("the name is " + nameInput);
    console.log("the password is " + passwordInput);
    console.log(contacts);
    return (
      contacts.findIndex(({ name, password }) => {
        console.log(name, password);
        return name === nameInput && password === passwordInput;
      }) !== -1
    );
  }

  function handleSignInPassword(password) {
    const passwordFound = contacts.find(
      (contact) => contact.password === password
    );
    console.log("the password is : " + passwordFound);
    if (passwordFound !== undefined) {
      return true;
    } else return false;
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

  function handleContactAdd(userName, password) {
    console.log("userName " + userName);
    console.log("passWord " + password);
    const newContact = {
      id: uuidv4(),
      name: userName,
      password: password,
      messages: [],
    };

    setContacts([...contacts, newContact]);
  }

  return (
    <ContactContext.Provider value={contactContextValue}>
      {/* <SignIn handleSignIn={handleSignIn} />
        <ContactList contacts={contacts} login={login} />
        <MessagesList id={selectedContactId} /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SignIn
                handleSignIn={handleSignIn}
                handleSignInPassword={handleSignInPassword}
              />
            }
          />

          <Route
            path="/signup"
            element={<SignUp handleContactAdd={handleContactAdd} />}
          />

          <Route
            path="/chat"
            element={<Warper contacts={contacts} id={selectedContactId} />}
          />
        </Routes>
      </BrowserRouter>
    </ContactContext.Provider>
  );
}

export default App;

const contactNames = [
  {
    id: 1,
    name: "Ariel Dodi",
    password: "Ariel Dodi",
    messages: [],
  },
  {
    id: 2,
    name: "Ori Kanfi",
    password: "Ori Kanfi",
    messages: [],
  },
  {
    id: 3,
    name: "Rom Shech",
    password: "Rom Shech",
    messages: [],
  },
  {
    id: 4,
    name: "Adam Knizhnik",
    password: "Adam Kniznik",
    messages: [],
  },
  {
    id: 5,
    name: "Nitay Yona",
    password: "Nitay Yona",
    messages: [],
  },
  {
    id: 6,
    name: "Adi Brettler",
    password: "Adi Brettler",
    messages: [],
  },
  {
    id: 7,
    name: "Ofri Wasser",
    password: "ofri Wasser",
    messages: [],
  },
  {
    id: 8,
    name: "N",
    password: "N",
    messages: [],
  },
];
