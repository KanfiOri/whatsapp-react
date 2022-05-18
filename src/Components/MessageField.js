import React from "react";

export default function MessageField({ handleKeyDown }) {
  return (
    <div>
      <input onKeyDown={handleKeyDown} />
    </div>
  );
}
