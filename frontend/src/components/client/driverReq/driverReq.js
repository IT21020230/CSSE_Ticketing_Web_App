import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAuthContext } from "../../../hooks/useAuthContext";

import { Axios } from "axios";

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

export default function SignIn() {
  const { user } = useAuthContext();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userId: data.get("userId"),
      name: data.get("name"),
      image: image,
    });

    // const response = await Axios.post(`http://localhost:9000/api/drivers/`, {
    //   userId: data.get("userId"),
    //   name: data.get("name"),
    //   image: image,
    // });

    const response = await fetch("http://localhost:9000/api/drivers/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: data.get("userId"),
        name: data.get("name"),
        image: image,
      }),
    });
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {user ? (
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <Typography component="h1" variant="h5">
                Become a Driver
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  defaultValue={user.userId}
                  margin="normal"
                  fullWidth
                  id="userId"
                  label="user ID"
                  name="userId"
                />
                <TextField
                  defaultValue={user.name}
                  margin="name"
                  fullWidth
                  name="name"
                  label="Name"
                  id="name"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={onInputChange}
                ></input>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Become a Driver
                </Button>
              </Box>
            </Box>
          ) : (
            <>Loading....</>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
