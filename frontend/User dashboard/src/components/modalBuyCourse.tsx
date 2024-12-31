import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f5fdff",
  border: "2px solid #0096c7",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

interface ModalBuyCourseProps {
  _id: string;
}

export default function ModalBuyCourse(props: ModalBuyCourseProps) {
  const { _id } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const buyURL = `http://localhost:3000/user/courses/${_id}`;

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleBuyCourse() {
    axios
      .post(buyURL, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      })
      .then(() => {
        navigate("/courses/purchased");
      })
      .catch((err) => {
        console.error("Couldn't buy the course", err);
      });
  }

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleOpen}
        startIcon={<ShoppingCartIcon />}
      >
        Purchase
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="subtitle1"
            component="h2"
            sx={{ fontWeight: 600, marginBottom: "10px" }}
          >
            Are you sure you want to purchase this course?
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={handleBuyCourse}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
