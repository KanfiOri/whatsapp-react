import React, { useContext } from "react";
import { ContactContext } from "./App";

export default function SearchName() {
  const { handleSearchName } = useContext(ContactContext);
  return (
    <div>
      <input onChange={(e) => handleSearchName(e.target.value)} />
    </div>
  );
}
