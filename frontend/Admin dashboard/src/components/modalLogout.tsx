import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState, registerState } from "../recoil/myatoms";

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

export default function ModalDeleteCourse() {
  const setIsRegistered = useSetRecoilState(registerState);
  const setIsLoggedin = useSetRecoilState(loginState);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleLogout() {
    localStorage.removeItem("admintoken");
    setIsRegistered(false);
    setIsLoggedin(false);
    navigate("/");
  }

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        Logout
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
            Are you sure you want to Logout?
          </Typography>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={handleLogout}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
