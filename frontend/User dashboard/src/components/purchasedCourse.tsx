import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface PurchasedCourseProps {
  title: string;
  description: string;
  imageURL: string;
}

export default function PurchasedCourse(props: PurchasedCourseProps) {
  const { title, description, imageURL } = props;
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
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" sx={{ marginRight: "10px" }}>
          Start Learning
        </Button>
      </CardActions>
    </Card>
  );
}
