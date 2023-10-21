import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";
import Axios from "axios";

import { useSignup } from "../../../hooks/useSignup";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Input } from "@material-ui/core";

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

export default function DriverReg() {
  const { user } = useAuthContext();
  console.log(user);

  const { signup, error, isLoading } = useSignup();
  //const [file, setFile] = useState([]);
  const [role, setRole] = useState("");
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);

  const handleImageOneChange = (e) => {
    setImageOne(e.target.files[0]);
  };

  const handleImageTwoChange = (e) => {
    setImageTwo(e.target.files[0]);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("userId", user.userId);
    formData.append("name", user.name);
    formData.append("imageOne", imageOne);
    formData.append("imageTwo", imageTwo);

    // await Axios.post("http://localhost:9000/api/drivers", {
    //   userId: data.get("userId"),
    //   name: data.get("name"),
    //   imageOne: file,
    // });
    try {
      const response = await fetch("http://localhost:9000/api/drivers", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        // Handle success
        console.log("Driver created successfully");
      } else {
        // Handle error
        console.error("Error creating driver");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //console.log(file);

  // const handleUpload = (e) => {
  //   console.log(file);
  //   //Axios.
  // };

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
            Become a Driver
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="userId"
                  name="userId"
                  defaultValue={user.userId}
                  fullWidth
                  id="userId"
                  label="User ID"
                  autoFocus
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  defaultValue={user.name}
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  disabled
                />
              </Grid>
              <Grid>
                <Typography style={{ marginTop: "20px" }}>
                  Upload frontside of the driver's licence
                </Typography>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageOneChange}
                  />
                </div>
              </Grid>
              <Grid>
                <Typography style={{ marginTop: "20px" }}>
                  Upload backside of the driver's licence
                </Typography>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageTwoChange}
                  />
                </div>
              </Grid>
              {/* <Grid>
                <Typography style={{ marginTop: "20px" }}>
                  Upload backside of the driver's licence
                </Typography>
                <div>
                  <input
                    type="file"
                    onChange={(e) => setFiles(e.target.files[1])}
                  />
                  {<Button onClick={handleUpload}> Upload</Button>
      
                </div>
              </Grid> */}
            </Grid>
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
