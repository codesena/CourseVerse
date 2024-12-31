import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface CourseProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageURL: string;
}

export default function Course(props: CourseProps) {
  const { _id, title, description, price, imageURL } = props;
  const navigate = useNavigate();
  function goToBuyCourse() {
    navigate("/courses/buy", {
      state: { _id, title, description, price, imageURL },
    });
  }

  return (
    <Card sx={{ minWidth: "300px", maxWidth: "300px", margin: "10px" }}>
      <CardMedia sx={{ height: "150px" }} image={imageURL} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={goToBuyCourse}
          sx={{ marginRight: "10px" }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
