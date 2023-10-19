//require("dotenv").config();
import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";
import Axios from "axios";

import { useAuthContext } from "../../../hooks/useAuthContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Typography color="inherit">Brogrammers</Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function User() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState();
  const [role, setRole] = useState("");

  //fetch user
  const fetchUsers = async () => {
    const response = await Axios.get(
      //   `${process.env.PUBLIC_API_URL}/api/users/`
      `http://localhost:9000/api/users/${user.userId}`
    );
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      fname: data.get("firstName"),
      lname: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      role: role,
      nic: data.get("nic"),
      phone: data.get("phone"),
    });

    const response = await Axios.put(
      `http://localhost:9000/api/users/${user.userId}`,
      {
        fname: data.get("firstName"),
        lname: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
        role: role,
        nic: data.get("nic"),
        phone: data.get("phone"),
      }
    );

    console.log(response);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            User Details
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleUpdateSubmit}
            sx={{ mt: 3 }}
          >
            {users ? (
              <>
                <img
                  id="qrcode-image"
                  src={users.accountId}
                  alt="QR Code"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />

                <br />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={users.name}
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={users.email}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={users.role}
                      //value={users.role}
                      label="Role"
                      fullWidth
                      onChange={handleChangeRole}
                    >
                      <MenuItem value={""} disabled>
                        Select a role
                      </MenuItem>
                      <MenuItem value={"Local Passenger"}>
                        Local Passenger
                      </MenuItem>
                      <MenuItem value={"Foreign Passenger"}>
                        Foreign Passenger
                      </MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      defaultValue={users.nic}
                      required
                      fullWidth
                      name="nic"
                      label="NIC"
                      id="nic"
                      autoComplete="given-nic"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      defaultValue={users.phone}
                      required
                      fullWidth
                      name="phone"
                      label="Contact Number"
                      id="phone"
                      autoComplete="given-phone"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}></Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update My Details
                </Button>
              </>
            ) : (
              <div>Loading...</div>
            )}

            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default User;
