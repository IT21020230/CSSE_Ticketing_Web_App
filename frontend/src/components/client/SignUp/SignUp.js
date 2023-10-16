import { React, useState } from "react";
import "./SignUp.css";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

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
        <FormControl fullWidth>
          <div>
            <Typography id="form-heading" />
            SignUp form
          </div>
          <div id="textfield">
            <TextField
              helperText="Please enter your name"
              id="demo-helper-text-aligned"
              label="Name"
            />
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
            <TextField
              required
              type="password"
              id="outlined-required"
              label="Confirm Password"
            />
          </div>
          <div>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleRoleChange}
              defaultValue="Local Passenger"
            >
              <MenuItem value={"Local Passenger"}>Local Passenger</MenuItem>
              <MenuItem value={"Foreign Passenger"}>Foreign Passenger</MenuItem>
            </Select>
          </div>
          <div id="textfield">
            <TextField
              required
              type="text"
              id="outlined-required"
              label="NIC"
            />
          </div>
          <div id="textfield">
            <TextField
              type="text"
              id="outlined-required"
              label="Phone number"
            />
          </div>

          <div style={{ alignContent: "center" }}>
            <Button variant="outlined">SignUp</Button>
          </div>
        </FormControl>
      </Box>
    </div>
  );
}

export default SignUp;
