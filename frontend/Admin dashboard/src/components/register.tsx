import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { registerState } from "../recoil/myatoms";

const postURL = "http://localhost:3000/admin/signup";

export default function Register() {
  const setIsRegistered = useSetRecoilState(registerState);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function goToLogin() {
    navigate("/login");
  }
  function handleRegister(e: { preventDefault: () => void }) {
    e.preventDefault();
    const newAdmin = {
      username,
      password,
    };
    axios
      .post(postURL, newAdmin)
      .then(() => {
        setIsRegistered(true);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error in registering.", err);
        setUsername("");
        setPassword("");
      });
  }

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ margin: "10px", color: "#1876d2" }}
      >
        Register as an Admin
      </Typography>
      <Card variant="outlined" style={{ padding: "10px" }}>
        <form style={{ maxWidth: "500px" }} autoComplete="off">
          <TextField
            value={username}
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ marginTop: "0px" }}
          />
          <TextField
            value={password}
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ marginTop: "0px" }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px", width: "100px" }}
            onClick={handleRegister}
          >
            Submit
          </Button>
        </form>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ marginLeft: "2px", marginTop: "30px" }}
        >
          Already registered?
        </Typography>
        <Button
          variant="contained"
          style={{ marginTop: "10px", width: "100px" }}
          onClick={goToLogin}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
