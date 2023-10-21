import React, { useState } from "react";
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
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { AiOutlineLogout } from "react-icons/ai";
import MenuItem from "@mui/material/MenuItem";
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

const listItems = [
  {
    listIcon: <Home />,
    listText: "Home",
  },
  {
    listIcon: <AssignmentInd />,
    listText: "Resume",
  },
  {
    listIcon: <Apps />,
    listText: "Portfolio",
  },
  {
    listIcon: <ContactMail />,
    listText: "Contacts",
  },
];

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
        {listItems.map((listItem, index) => (
          <ListItem className={classes.listItem} button key={index}>
            <ListItemIcon className={classes.listItem}>
              {listItem.listIcon}
            </ListItemIcon>
            <ListItemText primary={listItem.listText} />
          </ListItem>
        ))}
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
                  <AiOutlineLogout />
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
