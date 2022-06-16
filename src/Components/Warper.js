import React from "react";
import MessagesList from "./MessagesList";
import ContactList from "./ContactList";

export default function Warper({ contacts, id }) {
  return (
    <div>
      <ContactList contacts={contacts} />
      <MessagesList id={id} />
    </div>
  );
}
