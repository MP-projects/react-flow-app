import { Card, Typography, CardContent } from "@mui/material";

export default function BasicCardDraggable({ type, onDragStart }) {
  return (
    <Card
      onDragStart={onDragStart}
      draggable
      small="true"
      sx={{ minWidth: 175, cursor: "grab" }}>
      <CardContent
        align="center"
        sx={{
          p: 2,
        }}>
        <Typography variant="h7" component="div">
          {type} node
        </Typography>
      </CardContent>
    </Card>
  );
}
