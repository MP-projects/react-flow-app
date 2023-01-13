import { useState, useEffect } from "react";

import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  TextField,
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
  const { setNodes, getNode } = useReactFlow();
  const currentNode = getNode(id);
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
      if (nds.length > 0) {
        nds.forEach((node) => {
          if (node.id === id) {
            node.selected = selected;
          }
        });
        return nds;
      } else {
        return nds;
      }
    });
  };

  const updateTitle = () => {
    setNodes((nds) => {
      if (nds.length > 0) {
        nds.forEach((nd) => {
          if (nd.id === id) {
            nd.data.title = titleValue;
          }
        });
        return nds;
      } else return nds;
    });
  };
  const upodateComment = () => {
    setNodes((nds) => {
      if (nds.length > 0) {
        nds.forEach((nd) => {
          if (nd.id === id) {
            nd.data.text = commentValue;
          }
        });
        return nds;
      } else return nds;
    });
  };
  useEffect(() => {
    if (title && text) {
      setTitleValue(title);
      setCommentValue(text);
    }
  }, [title, text]);
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
              if (currentNode.selected) {
                setTitleEdit(true);
              }
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
            onBlur={() => {
              updateTitle();
              setTitleEdit(false);
            }}></TextField>
        )}

        {!commentEdit ? (
          <Typography
            sx={{ cursor: "text" }}
            onClick={() => {
              if (currentNode.selected) {
                setCommentEdit(true);
              }
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
            onBlur={() => {
              upodateComment();
              setCommentEdit(false);
            }}></TextField>
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
