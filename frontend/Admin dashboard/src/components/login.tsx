import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { loginState, registerState } from "../recoil/myatoms";

const postURL = "http://localhost:3000/admin/login";

export default function Register() {
  const setIsRegistered = useSetRecoilState(registerState);
  const setIsLoggedin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function goToRegister() {
    navigate("/register");
  }
  function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    const newAdmin = {
      username,
      password,
    };
    axios
      .post(postURL, newAdmin)
      .then((res) => {
        setIsRegistered(true);
        setIsLoggedin(true);
        localStorage.setItem("admintoken", res.data.token);
        navigate("/courses");
      })
      .catch((err) => {
        console.error("Error in logging in.", err);
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
        Login as an Admin
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
            onClick={handleLogin}
          >
            Submit
          </Button>
        </form>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ marginLeft: "2px", marginTop: "30px" }}
        >
          Not registered yet?
        </Typography>
        <Button
          variant="contained"
          style={{ marginTop: "10px", width: "100px" }}
          onClick={goToRegister}
        >
          Register
        </Button>
      </Card>
    </div>
  );
}
