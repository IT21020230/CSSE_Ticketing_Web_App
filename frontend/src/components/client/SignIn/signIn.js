import React from "react";
import "./signIn.css";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

function SignIn() {
  return (
    <div id="login-form" style={{ margin: "20px", alignItems: "center" }}>
      <Box
        id="form-box"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        outline="1px solid black"
      >
        <div>
          <Typography id="form-heading" />
          Signin form
        </div>
        <div id="textfield">
          <TextField
            required
            type="email"
            id="outlined-required"
            label="E-mail"
          />
        </div>
        <div id="textfield">
          <TextField
            required
            type="password"
            id="outlined-required"
            label="Password"
          />
        </div>
        <div style={{ alignContent: "center" }}>
          <Button variant="outlined">Login</Button>
        </div>
      </Box>
    </div>
  );
}

export default SignIn;
