import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useReactFlow } from "reactflow";
import { useEffect, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

export default function BasicCard({
  title,
  text,
  click,
  buttonTitle,
  selected,
  options,
  id,
}) {
  console.log(id);
  const { setNodes } = useReactFlow();
  const ref = useRef();
  useOnClickOutside(ref, () => {
    setSelect(false);
  });
  const setSelect = (selected) => {
    setNodes((nds) => {
      const currentNodes = [];
      if (nds.length > 0) {
        nds.map((node) => {
          if (node.id === id) {
            node.selected = selected;
          }
          currentNodes.push(node);
        });
        return currentNodes;
      } else {
        return nds;
      }
    });
  };

  return (
    <Card
      sx={{ minWidth: 275, cursor: "pointer" }}
      className={selected ? "react-flow__selection" : ""}
      onClick={() => {
        setSelect(true);
      }}
      ref={ref}>
      <DragHandleIcon className="drag-handler" />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2">{text}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button onClick={click} size="small">
          {buttonTitle}
        </Button>
      </CardActions>
    </Card>
  );
}
