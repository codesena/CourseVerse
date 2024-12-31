import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Card,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { coursesState } from "../recoil/myatoms";
import { courseType } from "@adityakumar172001/courselling_types";

export default function FormUpdateCourse() {
  const setCourses = useSetRecoilState(coursesState);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState<"" | number>("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const location = useLocation();
  const courseId: string = location.state;
  const putURL = `http://localhost:3000/admin/courses/${courseId}`;

  function handleAddCourse(e: { preventDefault: () => void }) {
    e.preventDefault();
    const updatedCourse = {
      title,
      description,
      imageURL,
      price,
      isPublished,
    };
    axios
      .put(putURL, updatedCourse, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      })
      .then(() => {
        setCourses((courses) =>
          courses.map((course) =>
            course._id !== courseId
              ? course
              : ({ ...course, ...updatedCourse } as courseType)
          )
        );
        navigate("/courses");
      })
      .catch((err) => {
        console.log(err);
        setTitle("");
        setDescription("");
        setImageURL("");
        setPrice("");
        setIsPublished(false);
      });
  }

  function handleCancelUpdate() {
    navigate("/courses");
  }

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card variant="outlined" style={{ padding: "10px" }}>
        <form
          onSubmit={handleAddCourse}
          style={{ maxWidth: "500px" }}
          autoComplete="off"
        >
          <TextField
            value={title}
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ marginTop: "0px" }}
          />
          <TextField
            value={description}
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            value={imageURL}
            label="Image URL"
            variant="outlined"
            onChange={(e) => setImageURL(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            value={price}
            label="Price in ₹"
            variant="outlined"
            onChange={(e) =>
              setPrice(Number(e.target.value) ? Number(e.target.value) : "")
            }
            fullWidth
            margin="dense"
          />
          <FormHelperText>is Published</FormHelperText>
          <Select
            labelId="demo-simple-select-label"
            value={isPublished}
            onChange={(e) => setIsPublished(e.target.value as boolean)}
            fullWidth
            margin="dense"
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px", width: "100px" }}
          >
            Update
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px", width: "100px", marginLeft: "10px" }}
            onClick={handleCancelUpdate}
          >
            Cancel
          </Button>
        </form>
      </Card>
    </div>
  );
}
