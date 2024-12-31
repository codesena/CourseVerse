import Typography from "@mui/material/Typography";

export default function NoPurchasedCourseFound() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Typography gutterBottom variant="h5" component="div">
        No purchased courses found
      </Typography>
    </div>
  );
}
