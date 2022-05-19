import React from "react";
import Contact from "./Contact";
import NameNavBar from "./NameNavBar";
import SearchName from "./SearchName";

export default function ContactList({ contacts }) {
  return (
    <div className="contact-list">
      <div>
        {contacts.map((contact) => {
          return <Contact key={contact.id} {...contact} />;
        })}
      </div>
      <div>
        <SearchName />
      </div>
    </div>
  );
}
