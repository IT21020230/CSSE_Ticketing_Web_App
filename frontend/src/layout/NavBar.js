import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { NavLink } from "react-router-dom";
import { Grid } from "@mui/material";

export default function NavBar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ height: "10px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container spacing={3}>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Transport
              </Typography>
            </Grid>
          </Grid>

          <NavLink
            href="/home"
            style={{ color: "inherit", fontWeight: "bold" }}
          >
            Home
          </NavLink>
          {user ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button href="/signIn" style={{ color: "inherit" }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
