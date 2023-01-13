import { useCallback } from "react";

import {
  Typography,
  Box,
  List,
  ListItem,
  Divider,
  Button,
} from "@mui/material";

import { useReactFlow } from "reactflow";

import BasicCardDraggable from "../../components/BasicCardDraggable";

export default function SideBar() {
  const reactFlowInstance = useReactFlow();
  const { setNodes, setEdges, setViewport } = useReactFlow();

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem("flow", JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("flow"));
  
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
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
          <ListItem>
            <Typography variant="h7">
              Select element and click backspace to delete it
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <BasicCardDraggable
              onDragStart={(event) => onDragStart(event, "customInput")}
              type="input"
            />
          </ListItem>
          <Divider />
          <ListItem
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <BasicCardDraggable
              onDragStart={(event) => onDragStart(event, "customDefault")}
              type="default"
            />
          </ListItem>
          <Divider />
          <ListItem
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <BasicCardDraggable
              type="output"
              onDragStart={(event) => onDragStart(event, "customOutput")}
            />
          </ListItem>
          <Divider />
          <ListItem
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Button
              sx={{ m: 1 }}
              fullWidth
              size="small"
              variant="contained"
              onClick={onSave}>
              Save
            </Button>

            <Button
              sx={{ m: 1}}
              fullWidth
              size="small"
              variant="contained"
              onClick={onRestore}>
              Restore
            </Button>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
