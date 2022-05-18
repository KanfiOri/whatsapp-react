import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function MessageField({ handleKeyDown }) {
  return (
    <div>
      <Box
        className="center"
        onKeyDown={handleKeyDown}
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField fullWidth label="Message" id="Message" />
      </Box>
    </div>
  );
}
