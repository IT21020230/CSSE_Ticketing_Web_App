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
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };
  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };
  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };
  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };
  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };

  const divStyle1 = {
    backgroundColor: isHovered1 ? "#C9CACA" : "#EEEDEF",
    padding: "0em 2em 2em 2em",
    transition: "all 0.3s ease-in-out", // Add transition for all properties
    margin: "10px",
  };
  const divStyle2 = {
    backgroundColor: isHovered2 ? "#C9CACA" : "#EEEDEF",
    padding: "0em 2em 2em 2em",
    transition: "all 0.3s ease-in-out", // Add transition for all properties
    margin: "10px",
  };
  const divStyle3 = {
    backgroundColor: isHovered3 ? "#C9CACA" : "#EEEDEF",
    padding: "0em 2em 2em 2em",
    transition: "all 0.3s ease-in-out", // Add transition for all properties
    margin: "10px",
  };

  function sendData(e, plan, price) {
    e.preventDefault();
    console.log(plan, price);
    const data = { plan, price };
    const dataString = JSON.stringify(data);
    window.location.href = `/balanceUpdate?data=${encodeURIComponent(
      dataString
    )}`;
  }
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <p style={{ fontSize: "3em", fontWeight: 600 }}>
            Choose your subscription plan here...
          </p>
        </Grid>

        <Grid item xs={12} style={{ margin: "0px 100px 0px 100px" }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <div
                style={divStyle1}
                onMouseEnter={handleMouseEnter1}
                onMouseLeave={handleMouseLeave1}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "2em", fontWeight: 600 }}>Basic</p>
                    <hr />
                  </Grid>
                  <Grid item xs={12}>
                    <p style={{ display: "inline", fontSize: "1.5em" }}>
                      Price:
                    </p>
                    <p
                      style={{
                        display: "inline",
                        fontSize: "2.4em",
                        fontWeight: 500,
                      }}
                    >
                      {" "}
                      Lkr 1000 /
                    </p>
                    <p style={{ display: "inline", fontSize: "1.5em" }}>
                      {" "}
                      Monthly
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <p style={{ fontSize: "1.2em", fontWeight: 600 }}>
                      What's Include
                    </p>
                  </Grid>
                  <Grid item xs={12} style={{ minHeight: "20em" }}>
                    <ul>
                      <li>can only get none a/c bus</li>
                      <li>Sheet booking unavailble</li>
                    </ul>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <button
                      style={{
                        backgroundColor: "#010001",
                        color: "white",
                        padding: "0.5em 2em 0.5em 2em",
                      }}
                      onClick={(e) => sendData(e, "Basic Package", 1000)}
                    >
                      Subscribe
                    </button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div
                style={divStyle2}
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "2em", fontWeight: 600 }}>Premium</p>
                    <hr />
                  </Grid>
                  <Grid item xs={12}>
                    <p style={{ display: "inline", fontSize: "1.5em" }}>
                      Price:
                    </p>
                    <p
                      style={{
                        display: "inline",
                        fontSize: "2.4em",
                        fontWeight: 500,
                      }}
                    >
                      {" "}
                      Lkr 3000 /
                    </p>
                    <p style={{ display: "inline", fontSize: "1.5em" }}>
                      {" "}
                      Monthly
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <p style={{ fontSize: "1.2em", fontWeight: 600 }}>
                      What's Include
                    </p>
                  </Grid>
                  <Grid item xs={12} style={{ minHeight: "20em" }}>
                    <ul>
                      <li>can get a/c bus</li>
                      <li>Sheet booking unavailble</li>
                    </ul>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <button
                      style={{
                        backgroundColor: "#010001",
                        color: "white",
                        padding: "0.5em 2em 0.5em 2em",
                      }}
                      onClick={(e) => sendData(e, "Premium Package", 3000)}
                    >
                      Subscribe
                    </button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div
                style={divStyle3}
                onMouseEnter={handleMouseEnter3}
                onMouseLeave={handleMouseLeave3}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "2em", fontWeight: 600 }}>
                      Enterprise
                    </p>
                    <hr />
                  </Grid>
                  <Grid item xs={12}>
                    <p style={{ display: "inline", fontSize: "1.5em" }}>
                      Price:
                    </p>
                    <p
                      style={{
                        display: "inline",
                        fontSize: "2.4em",
                        fontWeight: 500,
                      }}
                    >
                      {" "}
                      Lkr 6000 /
                    </p>
                    <p style={{ display: "inline", fontSize: "1.5em" }}>
                      {" "}
                      Monthly
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <p style={{ fontSize: "1.2em", fontWeight: 600 }}>
                      What's Include
                    </p>
                  </Grid>
                  <Grid item xs={12} style={{ minHeight: "20em" }}>
                    <li>can get a/c bus</li>
                    <li>Sheet booking availble</li>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <button
                      style={{
                        backgroundColor: "#010001",
                        color: "white",
                        padding: "0.5em 2em 0.5em 2em",
                      }}
                      onClick={(e) => sendData(e, "Enterprise Package", 6000)}
                    >
                      Subscribe
                    </button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SubscriptionPlan;
