import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const [users, setUsers] = useState();
  const [rows, setRows] = useState([]);

  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const [currentUpdateId, setCurrentUpdateId] = useState("");

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "email",
      headerName: "E-mail",
      width: 180,
    },
    {
      field: "role",
      headerName: "Type",
      width: 150,
    },
    {
      field: "nic",
      headerName: "NIC",
      width: 150,
    },
    {
      field: "registeredDate",
      headerName: "Date of Registration",
      width: 150,
    },
    {
      field: "accountBalance",
      headerName: "Account\nBalance",
      width: 130,
    },
    {
      field: "edit",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <EditIcon
          // onClick={() => {
          //   console.log("Current Update ID:", params.row.id);
          //   setCurrentUpdateId(params.row.id);
          //   handleUpdateModalOpen(params.row.id);
          // }}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 50,

      renderCell: (params) => (
        <DeleteIcon
          onClick={() => {
            setCurrentDeleteId(params.row.id);
            handleDeleteModalOpen();
          }}
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  //Delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteModalOpen = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  //Delete Success modal
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] =
    React.useState(false);
  const handleDeleteSuccessModalOpen = () => {
    setOpenDeleteSuccessModal(true);
  };
  const handleDeleteSuccessModalClose = () => {
    setOpenDeleteSuccessModal(false);
  };

  //handle Update Confirm Modal Close
  // const [openUpdateConfirmModal, setOpenUpdateConfirmModal] =
  //   React.useState(false);
  // const handleUpdateConfirmModalOpen = () => {
  //   setOpenUpdateConfirmModal(true);
  // };
  // const handleUpdateConfirmModalClose = () => {
  //   setOpenUpdateConfirmModal(false);
  // };

  //Update form modal
  // const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  // const handleUpdateModalOpen = (id) => {
  //   setCurrentUpdateObject(lessons.filter((item) => item._id === id));
  //   setOpenUpdateModal(true);
  // };
  // const handleUpdateModalClose = () => {
  //   setOpenUpdateModal(false);
  // };

  //Update Success modal
  // const [openUpdateSuccessModal, setOpenUpdateSuccessModal] =
  //   React.useState(false);
  // const handleUpdateSuccessModalOpen = () => {
  //   setOpenUpdateSuccessModal(true);
  // };
  // const handleUpdateSuccessModalClose = () => {
  //   setOpenUpdateSuccessModal(false);
  // };

  //Delete a lesson function
  const handleDelete = async () => {
    await Axios.delete(`http://localhost:9000/api/users/${currentDeleteId}`);
    console.log("Deleted ID:", currentDeleteId);
    handleDeleteModalClose();
    handleDeleteSuccessModalOpen();
    fetchUsers();
  };

  //Update a lesson
  // const handleUpdate = async () => {
  //   Axios.patch(`http://localhost:9000/api/users/${currentUpdateId}`, {
  //     name: data.get("name"),
  //     email: data.get("email"),
  //     password: data.get("password"),
  //     role: data.get("role"),
  //     nic: data.get("nic"),
  //     accountBalance: data.get("accountBalance"),
  //   });

  //   if (true) {
  //     handleUpdateModalClose();
  //     handleUpdateConfirmModalClose();
  //     handleUpdateSuccessModalOpen();
  //   }
  // };

  //Fetch users
  const fetchUsers = async () => {
    const response = await Axios.get(`http://localhost:9000/api/users`);
    setUsers(response.data);
    console.log(response.data);

    //const formattedDate = originalDate.toISOString().split('T')[0];

    //set into rows
    const formattedUsers = response.data.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      nic: user.nic,
      registeredDate: new Date(user.registeredDate).toISOString().split("T")[0],
      accountBalance: user.accountBalance,
    }));

    setRows(formattedUsers);
  };

  useEffect(() => {
    fetchUsers();
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

        {/* Delete confirm modal */}
        <Modal open={openDeleteModal} onClose={handleDeleteModalClose}>
          <Box sx={{ ...style, width: 400 }}>
            <h2
              className="text-3xl font-semibold text-black"
              id="parent-modal-title"
            >
              Are you sure want to delete this lesson?
            </h2>
            <br />

            <div className="flex justify-between">
              <Button
                className="mt-3 hover:bg-blue-800 bg-blue-700 w-max h-12 text-white py-1 px-8 rounded-md"
                onClick={handleDeleteModalClose}
              >
                Cancel
              </Button>
              <Button
                className="mt-3 hover:bg-pink-700 bg-pink-600 w-max h-12 text-white py-1 px-8 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Delete Success modal */}
        <Modal
          open={openDeleteSuccessModal}
          onClose={handleDeleteSuccessModalClose}
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2
              className="text-3xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 text-center"
              id="parent-modal-title"
            >
              User Deleted Successfully!
            </h2>
            <br />

            <div className="flex justify-center items-center">
              <Button
                className="mt-3 hover:bg-green-800 bg-green-700 w-max h-11 text-white py-1 px-8 rounded-md"
                onClick={handleDeleteSuccessModalClose}
              >
                Okay
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Update modal */}
        {/* <Modal open={openUpdateModal} onClose={handleUpdateModalClose}>
          <Typography component="h1" variant="h5">
            User Details
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleUpdateSubmit}
            sx={{ mt: 3 }}
          >
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
                    defaultValue={currentUpdateObject[0].name}
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
                    defaultValue={currentUpdateObject[0].email}
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
                    defaultValue={currentUpdateObject[0].role}
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
                    defaultValue={currentUpdateObject[0].nic}
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
                    defaultValue={currentUpdateObject[0].phone}
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
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Modal> */}

        {/* Update confirm modal */}
        {/* <Modal
          open={openUpdateConfirmModal}
          onClose={handleUpdateConfirmModalClose}
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2
              className="text-3xl font-semibold text-black"
              id="parent-modal-title"
            >
              Are you sure want to update this lesson?
            </h2>
            <br />

            <div className="flex justify-between">
              <Button
                className="mt-3 hover:bg-blue-800 bg-blue-700 w-max h-12 text-white py-1 px-8 rounded-md"
                onClick={handleUpdateConfirmModalClose}
              >
                Cancel
              </Button>
              <Button
                className="mt-3 hover:bg-pink-700 bg-pink-600 w-max h-12 text-white py-1 px-8 rounded-md"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </Box>
        </Modal> */}
      </Container>
    </ThemeProvider>
  );
}
