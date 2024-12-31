import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSetRecoilState } from "recoil";
import { coursesState } from "../recoil/myatoms";

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

interface ModalDeleteCourseProps {
  _id: string;
}

export default function ModalDeleteCourse(props: ModalDeleteCourseProps) {
  const { _id } = props;
  const setCourses = useSetRecoilState(coursesState);
  const [open, setOpen] = useState(false);
  const deleteURL = `http://localhost:3000/admin/courses/${_id}`;

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleDelete() {
    axios
      .delete(deleteURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      })
      .then(() => {
        setCourses((courses) => courses.filter((course) => course._id !== _id));
      })
      .catch((err) => {
        console.error("Error in delting data", err);
      });
  }

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleOpen}
        endIcon={<DeleteIcon />}
      >
        Delete
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
            Are you sure you want to delete this course?
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleDelete}
            endIcon={<DeleteIcon />}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
