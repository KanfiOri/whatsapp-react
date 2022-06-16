import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactList from "./ContactList";
import MessagesList from "./MessagesList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../css/app.css";
import Warper from "./Warper";
import { v4 as uuidv4 } from "uuid";
import { getContacts, addContact } from "../api/contacts";

export const ContactContext = React.createContext();
const LOCAL_STORAGE_KEY = "whatsapp-react.KANFI";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedContactId, setSelectedContactId] = useState();
  const [logedUser, setLogedUser] = useState("");

  useEffect(() => {
    const test = async () => {
      const contacts = (await getContacts()).data;
      setContacts(contacts);
      setFilteredContacts(contacts);
    };

    test();
  }, []);

  const contactContextValue = {
    handleContactSelect,
    handleAddMessage,
    selectedContact,
    handleSearchName,
  };

  function handleSearchName(letters) {
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.username.toLowerCase().includes(letters.toLowerCase())
      )
    );
  }

  function handleSignIn(nameInput, passwordInput) {
    console.log("the username is " + nameInput);
    console.log("the password is " + passwordInput);

    return (
      contacts.findIndex(({ username, password }) => {
        console.log(username, password);
        return username === nameInput && password === passwordInput;
      }) !== -1
    );
  }

  function handleSignInPassword(password) {
    const passwordFound = contacts.find(
      (contact) => contact.password === password
    );

    console.log(passwordFound);
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

  async function handleContactAdd(username, password) {
    console.log("userName " + username);
    console.log("passWord " + password);

    const newContact = {
      username,
      password,
      messages: [],
    };

    await addContact(newContact);

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
            element={
              <Warper contacts={filteredContacts} id={selectedContactId} />
            }
          />
        </Routes>
      </BrowserRouter>
    </ContactContext.Provider>
  );
}

export default App;
