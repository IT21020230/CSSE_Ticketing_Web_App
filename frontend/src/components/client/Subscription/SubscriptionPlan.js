import React, { useState } from "react";
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
function SubscriptionPlan() {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <p>Choose your subscription plan here</p>
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
}

export default SubscriptionPlan;
