
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";


export default function BasicCard({ title, text, click , buttonTitle }) {
  


  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2">{text}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
              <Button onClick={click} size="small">{buttonTitle}</Button>
      </CardActions>
    </Card>
  );
}
