import React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import BasicCardDraggable from "../../components/BasicCardDraggable";
import { Typography } from "@mui/material";
export default function SideBar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 225,
          bgcolor: "background.paper",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <nav aria-label="main mailbox folders">
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <ListItem
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography variant="h7"> Drag elements to add them</Typography>
            </ListItem>
            <ListItem
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onDragStart={(event) => onDragStart(event, "customInput")}
              draggable>
              <BasicCardDraggable type="input" />
            </ListItem>
            <Divider />
            <ListItem
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onDragStart={(event) => onDragStart(event, "customDefault")}
              draggable>
              <BasicCardDraggable type="default" />
            </ListItem>
            <Divider />
            <ListItem
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onDragStart={(event) => onDragStart(event, "customOutput")}
              draggable>
              <BasicCardDraggable type="output" />
            </ListItem>
          </List>
        </nav>
        <Divider />
      </Box>
    </>
  );
}
