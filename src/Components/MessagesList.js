import React, { useContext } from "react";
import NameNavBar from "./NameNavBar";
import MessageField from "./MessageField";
import { ContactContext } from "./App";

export default function MessagesList({ id }) {
  const { handleAddMessage, selectedContact } = useContext(ContactContext);

  function handleChange(message) {
    handleAddMessage(id, message);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleChange(e.target.value);
      e.target.value = "";
    }
  }

  return (
    <div className="messages-list">
      <NameNavBar />
      {selectedContact.messages != null &&
        selectedContact.messages.map((message) => {
          return <div>{message}</div>;
        })}
      {/* <input onKeyDown={handleKeyDown} /> */}
      {selectedContact && <MessageField handleKeyDown={handleKeyDown} />}
    </div>
  );
}
