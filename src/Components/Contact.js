import React, { useContext } from "react";
import { ContactContext } from "./App";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function Contact({ id, name, messages }) {
  const { handleContactSelect } = useContext(ContactContext);
  return (
    <>
      <ListItem alignItems="flex-start" onClick={() => handleContactSelect(id)}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {messages[messages.length - 1]}
              </Typography>
              {}
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
}
