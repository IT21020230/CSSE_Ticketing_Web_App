import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
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
  const [currentUpdateId, setCurrentUpdateId] = useState("");
  const [currentUpdateObject, setCurrentUpdateObject] = useState([]);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const columns = [
    {
      field: "userId",
      headerName: "User ID",
      width: 180,
    },
    { field: "name", headerName: "Name", width: 200 },

    {
      field: "role",
      headerName: "Type",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "registeredDriverDate",
      headerName: "Date of Registration as a Driver",
      width: 150,
    },
    {
      field: "edit",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <CancelIcon
          //   onClick={() => {
          //     console.log("Current Update ID:", params.row.id);
          //     setCurrentUpdateId(params.row.id);
          //     handleUpdateModalOpen(params.row.id);
          //   }}
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

  //   // handle Update Confirm Modal Close
  //   const [openUpdateConfirmModal, setOpenUpdateConfirmModal] = useState(false);
  //   const handleUpdateConfirmModalOpen = () => {
  //     setOpenUpdateConfirmModal(true);
  //   };
  //   const handleUpdateConfirmModalClose = () => {
  //     setOpenUpdateConfirmModal(false);
  //   };

  //   //Update form modal
  //   const [openUpdateModal, setOpenUpdateModal] = useState(false);
  //   const handleUpdateModalOpen = (id) => {
  //     console.log("ID:", id);
  //     setCurrentUpdateObject(users.filter((user) => user._id === id));
  //     setOpenUpdateModal(true);
  //     console.log(currentUpdateObject);
  //   };
  //   const handleUpdateModalClose = () => {
  //     setOpenUpdateModal(false);
  //   };

  //   //Update Success modal
  //   const [openUpdateSuccessModal, setOpenUpdateSuccessModal] = useState(false);
  //   const handleUpdateSuccessModalOpen = () => {
  //     setOpenUpdateSuccessModal(true);
  //   };
  //   const handleUpdateSuccessModalClose = () => {
  //     setOpenUpdateSuccessModal(false);
  //   };

  //Approve a driver function
  const handleApprove = async (event) => {
    event.preventDefault();
    const response = await Axios.put(
      `http://localhost:9000/api/drivers/${currentApproveId}`,
      { status: "Approved" }
    );

    console.log("Approved ID:", currentApproveId);
    handleApproveModalClose();
    handleApproveSuccessModalOpen();
    fetchDrivers();
    console.log(response);
  };

  // //Update a lesson
  //   const handleUpdate = async (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     Axios.patch(`http://localhost:9000/api/drivers/${currentUpdateId}`, {
  //       name: data.get("name"),
  //       email: data.get("email"),
  //       password: data.get("password"),
  //       role: role,
  //       nic: data.get("nic"),
  //       accountBalance: data.get("accountBalance"),
  //     });

  //     if (true) {
  //       handleUpdateModalClose();
  //       handleUpdateConfirmModalClose();
  //       handleUpdateSuccessModalOpen();
  //     }
  //   };

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
          All Passengers
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
      </Container>
    </ThemeProvider>
  );
}
