import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import ModalBuyCourse from "./modalBuyCourse";

export default function BuyCourse() {
  const location = useLocation();
  const { _id, title, description, price, imageURL } = location.state;

  return (
    <>
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "50px" }}>
          <Typography variant="h4" fontWeight={600} marginBottom="5px">
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.primary"
            marginBottom="20px"
          >
            {description}
          </Typography>
          <Typography
            variant="subtitle2"
            color="#003049"
            sx={{ fontWeight: 600, marginBottom: "2px" }}
          >
            Price: {price}
          </Typography>
          <ModalBuyCourse _id={_id} />
        </div>
        <div>
          <img
            src={imageURL}
            alt={`${title} course image`}
            style={{ maxWidth: "700px" }}
          />
        </div>
      </div>
    </>
  );
}
