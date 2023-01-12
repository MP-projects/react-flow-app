import { useState } from "react";

import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";

import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useReactFlow } from "reactflow";
import { useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

export default function BasicCard({
  title,
  text,
  click,
  buttonTitle,
  selected,
  id,
}) {
  const { setNodes } = useReactFlow();

  const cardRef = useRef();

  const [titleEdit, setTitleEdit] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [commentValue, setCommentValue] = useState(text);

  useOnClickOutside(cardRef, () => {
    setSelect(false);
  });
  const setSelect = (selected) => {
    setNodes((nds) => {
      const currentNodes = [];
      if (nds.length > 0) {
        nds.forEach((node) => {
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
      ref={cardRef}>
      <DragHandleIcon className="drag-handler" />
      <CardContent>
        {!titleEdit ? (
          <Typography
            onClick={() => {
              setTitleEdit(true);
            }}
            sx={{ cursor: "text" }}
            variant="h5"
            component="div"
            gutterBottom>
            {titleValue}
          </Typography>
        ) : (
          <TextField
            value={titleValue}
            onChange={(e) => {
              setTitleValue(e.target.value);
            }}
            autoFocus={true}
            onBlur={() => setTitleEdit(false)}></TextField>
        )}

        {!commentEdit ? (
          <Typography
            sx={{ cursor: "text" }}
            onClick={() => {
              setCommentEdit(true);
            }}
            variant="body2">
            {commentValue}
          </Typography>
        ) : (
          <TextField
            value={commentValue}
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
            autoFocus={true}
            onBlur={() => setCommentEdit(false)}></TextField>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button onClick={click} size="small">
          {buttonTitle}
        </Button>
      </CardActions>
    </Card>
  );
}
