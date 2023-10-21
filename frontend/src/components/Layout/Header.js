import React, { useState, startTransition } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import "./styles.css";
import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  CssBaseline,
  Drawer,
  Typography,
} from "@material-ui/core";
import {
  Apps,
  Menu,
  ContactMail,
  AssignmentInd,
  Home,
} from "@material-ui/icons";
import { Grid, useRadioGroup } from "@mui/material";
import Button from "@mui/material/Button";
import { AiOutlineLogout } from "react-icons/ai";
import MenuItem from "@mui/material/MenuItem";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: "#5866B6",
    height: "100%",
  },
  avatar: {
    margin: "0.5rem auto",
    padding: "1rem",
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  listItem: {
    color: "tan",
  },
}));

export default function App() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleSlider = () => {
    setOpen(!open);
  };

  const sideList = () => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      style={{ width: "19em" }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "white", fontSize: "20px" }}>Transport Manager</p>
      </div>
      <div
        style={{
          backgroundColor: "white",
          paddingTop: "20px",
          marginTop: "0em",
        }}
      >
        {/* <Avatar
          className={classes.avatar}
          src="https://i.ibb.co/rx5DFbs/avatar.png"
          alt="Juaneme8"
        /> */}
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <img
              src="https://cdn.britannica.com/13/4413-004-3277D2EF/Flag-Sri-Lanka.jpg"
              style={{ width: "120px", marginLeft: "1em" }}
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src="https://t4.ftcdn.net/jpg/01/20/59/71/360_F_120597142_pGMeoRNfjqGsnKqapnqWNBUULfKtEqju.jpg"
              style={{ width: "120px", marginTop: "-10px" }}
            />
          </Grid>
        </Grid>
        <Divider />
      </div>

      <List>
        <ListItem className={classes.listItem} button>
          <ListItemIcon className={classes.listItem}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>


        <Link to="/user" style={{ textDecoration: "none" }}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItem}>
              <ContactMail />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
        </Link>

        {user.role === "Admin" && (
          <>
            <Link to="/driverAccept" style={{ textDecoration: "none" }}>
              <ListItem className={classes.listItem} button>
                <ListItemIcon className={classes.listItem}>
                  <ContactMail />
                </ListItemIcon>
                <ListItemText primary="Accept Drivers" />
              </ListItem>
            </Link>

            <Link to="/passengers" style={{ textDecoration: "none" }}>
              <ListItem className={classes.listItem} button>
                <ListItemIcon className={classes.listItem}>
                  <AssignmentInd />
                </ListItemIcon>
                <ListItemText primary="Passenger List" />
              </ListItem>
            </Link>
          </>
        )}

        <Link to="/driverReg" style={{ textDecoration: "none" }}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItem}>
              <AssignmentInd />
            </ListItemIcon>
            <ListItemText primary="Become a Driver" />
          </ListItem>
        </Link>


        <ListItem className={classes.listItem} button>
          <ListItemIcon className={classes.listItem}>
            <ContactMail />
          </ListItemIcon>
          <ListItemText primary="Name 4" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />

      <Box component="nav">
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleSlider}>
              <Menu />
            </IconButton>
            <Grid container spacing={3}>
              <Grid
                item
                xs={3}
                style={{ marginBottom: "-4em", fontWeight: 600 }}
              >
                <Typography>Public Transport Manager</Typography>
              </Grid>
              <Grid item xs={8.5}></Grid>
              <Grid item xs={0.5}>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "0px",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  <AiOutlineLogout onClick={handleLogout} />
                </button>
              </Grid>
            </Grid>
            <Drawer open={open} anchor="left" onClose={toggleSlider}>
              {sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
