import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Axios from "axios";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAuthContext } from "../../../hooks/useAuthContext";

// modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const defaultTheme = createTheme();

export default function DataTable() {
  const { user } = useAuthContext();

  const [role, setRole] = useState("");

  const [drivers, setDrivers] = useState();
  const [rows, setRows] = useState([]);

  const [currentApproveId, setCurrentApproveId] = useState("");
  const [currentViewId, setCurrentViewId] = useState("");
  const [currentViewObject, setCurrentViewObject] = useState();

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const columns = [
    {
      field: "userId",
      headerName: "User ID",
      width: 200,
    },
    { field: "name", headerName: "Name", width: 200 },

    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "registeredDriverDate",
      headerName: "Date of Registration",
      width: 200,
    },
    {
      field: "view",
      headerName: "",
      width: 50,

      renderCell: (params) => (
        <RemoveRedEyeIcon
          onClick={() => {
            console.log(params.row.id);
            setCurrentViewId(params.row.id);
            handleViewModalOpen(params.row.id);
          }}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      field: "edit",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <CancelIcon
          onClick={() => {
            setCurrentApproveId(params.row.id);
            handleDeclineModalOpen(params.row.id);
          }}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      field: "approve",
      headerName: "",
      width: 50,

      renderCell: (params) => (
        <CheckCircleIcon
          onClick={() => {
            setCurrentApproveId(params.row.id);
            handleApproveModalOpen();
          }}
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  //Approve modal
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const handleApproveModalOpen = () => {
    setOpenApproveModal(true);
  };
  const handleApproveModalClose = () => {
    setOpenApproveModal(false);
  };

  //Approve Success modal
  const [openApproveSuccessModal, setOpenApproveSuccessModal] = useState(false);
  const handleApproveSuccessModalOpen = () => {
    setOpenApproveSuccessModal(true);
  };
  const handleApproveSuccessModalClose = () => {
    setOpenApproveSuccessModal(false);
  };

  //Decline modal
  const [openDeclineModal, setOpenDeclineModal] = useState(false);
  const handleDeclineModalOpen = () => {
    setOpenDeclineModal(true);
  };
  const handleDeclineModalClose = () => {
    setOpenDeclineModal(false);
  };

  //Decline Success modal
  const [openDeclineSuccessModal, setOpenDeclineSuccessModal] = useState(false);
  const handleDeclineSuccessModalOpen = () => {
    setOpenDeclineSuccessModal(true);
  };
  const handleDeclineSuccessModalClose = () => {
    setOpenDeclineSuccessModal(false);
  };

  //View modal
  const [openViewModal, setOpenViewModal] = useState(false);
  const handleViewModalOpen = (id) => {
    console.log("View ID:", id);
    setCurrentViewObject(drivers.find((driver) => driver._id === id));
    setOpenViewModal(true);
  };
  const handleViewModalClose = () => {
    setOpenViewModal(false);
  };

  //Approve a driver function
  const handleApprove = async (event) => {
    event.preventDefault();
    const response = await Axios.put(
      `http://localhost:9000/api/drivers/${currentApproveId}`,
      { status: "Approved", role: "Driver" }
    );

    console.log("Approved ID:", currentApproveId);
    handleApproveModalClose();
    handleApproveSuccessModalOpen();
    fetchDrivers();
    console.log(response);
  };

  //Decline a driver function
  const handleDecline = async (event) => {
    event.preventDefault();
    const response = await Axios.put(
      `http://localhost:9000/api/drivers/${currentApproveId}`,
      { status: "Declined", role: "Local Passenger" }
    );

    console.log("Declined ID:", currentApproveId);
    handleDeclineModalClose();
    handleDeclineSuccessModalOpen();
    fetchDrivers();
    console.log(response);
  };

  //Decline a driver view function
  const handleDeclineView = async (event) => {
    event.preventDefault();
    const response = await Axios.put(
      `http://localhost:9000/api/drivers/${currentViewObject._id}`,
      { status: "Declined", role: "Local Passenger" }
    );

    console.log("Declined ID:", currentApproveId);
    handleDeclineModalClose();
    handleDeclineSuccessModalOpen();
    handleViewModalClose();
    fetchDrivers();
    console.log(response);
  };

  //Approve a driver view function
  const handleApproveView = async (event) => {
    event.preventDefault();
    const response = await Axios.put(
      `http://localhost:9000/api/drivers/${currentViewObject._id}`,
      { status: "Approved", role: "Driver" }
    );

    console.log("Declined ID:", currentApproveId);
    handleApproveModalClose();
    handleApproveSuccessModalOpen();
    handleViewModalClose();
    fetchDrivers();
    console.log(response);
  };

  //Fetch Drivers
  const fetchDrivers = async () => {
    const response = await Axios.get(`http://localhost:9000/api/drivers`);
    setDrivers(response.data);
    console.log(response.data);

    //set into rows
    const formattedDrivers = response.data.map((user) => ({
      id: user._id,
      userId: user.userId,
      name: user.name,
      role: user.role,
      status: user.status,
      registeredDriverDate: new Date(user.registeredDriverDate)
        .toISOString()
        .split("T")[0],
    }));

    setRows(formattedDrivers);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <br />
        <Typography
          component="h1"
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          All Driver Requests
        </Typography>
        <br />
        {rows ? (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loarding...
          </div>
        )}

        <Copyright sx={{ mt: 5 }} />

        {/* View modal */}
        {currentViewObject ? (
          <Modal open={openViewModal} onClose={handleViewModalClose}>
            <Box sx={{ ...style, width: 400 }}>
              <h2
                className="text-3xl font-semibold text-black"
                id="parent-modal-title"
              >
                Driver Details
              </h2>
              <form className="mt-2 mb-2 max-w-screen-lg sm:w-150">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={currentViewObject.userId}
                      fullWidth
                      id="userId"
                      label="User ID"
                      name="userId"
                      autoComplete="userId"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={currentViewObject.name}
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={currentViewObject.status}
                      fullWidth
                      id="status"
                      label="Status"
                      name="status"
                      autoComplete="status"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={currentViewObject.registeredDriverDate}
                      fullWidth
                      id="registeredDriverDate"
                      label="Date of Registration"
                      name="registeredDriverDate"
                      autoComplete="registeredDriverDate"
                      disabled
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                          <img />
                        </Grid>
                        <Grid item xs={12}>
                          <img />
                        </Grid> */}
                </Grid>
              </form>
              <br />

              <div className="flex justify-between">
                <Button
                  className="mt-3 hover:bg-blue-800 bg-blue-700 w-max h-12 text-white py-1 px-8 rounded-md"
                  onClick={handleDeclineView}
                >
                  Decline
                </Button>

                <Button
                  className="mt-3 hover:bg-pink-700 bg-pink-600 w-max h-12 text-white py-1 px-8 rounded-md"
                  onClick={handleApproveView}
                >
                  Approve
                </Button>
              </div>
            </Box>
          </Modal>
        ) : (
          <></>
        )}

        {/* Approve confirm modal */}
        <Modal open={openApproveModal} onClose={handleApproveModalClose}>
          <Box sx={{ ...style, width: 400 }}>
            <h2
              className="text-3xl font-semibold text-black"
              id="parent-modal-title"
            >
              Are you sure want to approve this driver?
            </h2>
            <br />

            <div className="flex justify-between">
              <Button
                className="mt-3 hover:bg-blue-800 bg-blue-700 w-max h-12 text-white py-1 px-8 rounded-md"
                onClick={handleApproveModalClose}
              >
                Cancel
              </Button>
              <Button
                className="mt-3 hover:bg-pink-700 bg-pink-600 w-max h-12 text-white py-1 px-8 rounded-md"
                onClick={handleApprove}
              >
                Approve
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Decline confirm modal */}
        <Modal open={openDeclineModal} onClose={handleDeclineModalClose}>
          <Box sx={{ ...style, width: 400 }}>
            <h2
              className="text-3xl font-semibold text-black"
              id="parent-modal-title"
            >
              Are you sure want to decline this driver?
            </h2>
            <br />

            <div className="flex justify-between">
              <Button
                className="mt-3 hover:bg-blue-800 bg-blue-700 w-max h-12 text-white py-1 px-8 rounded-md"
                onClick={handleDeclineModalClose}
              >
                Cancel
              </Button>
              <Button
                className="mt-3 hover:bg-pink-700 bg-pink-600 w-max h-12 text-white py-1 px-8 rounded-md"
                onClick={handleDecline}
              >
                Decline
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Approve Success modal */}
        <Modal
          open={openApproveSuccessModal}
          onClose={handleApproveSuccessModalClose}
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2
              className="text-3xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 text-center"
              id="parent-modal-title"
            >
              Driver Approved Successfully!
            </h2>
            <br />

            <div className="flex justify-center items-center">
              <Button
                className="mt-3 hover:bg-green-800 bg-green-700 w-max h-11 text-white py-1 px-8 rounded-md"
                onClick={handleApproveSuccessModalClose}
              >
                Okay
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Decline Success modal */}
        <Modal
          open={openDeclineSuccessModal}
          onClose={handleDeclineSuccessModalClose}
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2
              className="text-3xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 text-center"
              id="parent-modal-title"
            >
              Driver Declined Successfully!
            </h2>
            <br />

            <div className="flex justify-center items-center">
              <Button
                className="mt-3 hover:bg-green-800 bg-green-700 w-max h-11 text-white py-1 px-8 rounded-md"
                onClick={handleDeclineSuccessModalClose}
              >
                Okay
              </Button>
            </div>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}
