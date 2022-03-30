import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import LoadingIndicator from "../../components/Loading";
import PageNotFound from "../../components/errorHandling/PageNotFound";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import useAxios from "../../services/useAxios";
// import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro";
// import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import { textAlign } from "@mui/system";

const baseURL = "http://localhost:8000";
const pageSize = 5;
const rowsPerPageOptions = [5];

const EmployeeTable = (props) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("authToken");
  const [users, setUsers] = useState({});

  const { response, loading, error } = useAxios({
    url: "users",
    method: "get",
  });

  useEffect(() => {
    if (response != null) {
      const userList = response.map((user, id) => {
        return {
          id: id + 1,
          userId: user._id,
          name: user.name,
          email: user.email,
          age: user.age,
        };
      });
      setUsers(userList);
    }
  }, [response]);



  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 280, editable: true },
    { field: "email", headerName: "Email", width: 300, editable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      editable: true,
    },
    // { field: "role", headerName: "Role", width: 180, editable: true },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", m: 1 }}>
            <Button
              title="edit"
              variant="text"
              color="secondary"
              onClick={() => handleUpdate(params.row)}
              fontSize="small"
            >
              <EditIcon />
            </Button>
            <Button
              title="delete"
              variant="text"
              color="error"
              onClick={() => handleDelete(params.row.userId)}
              fontSize="small"
            >
              <HighlightOffIcon />
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleUpdate = async (params) => {
    navigate(`/employees/edit/${params.userId}?name=${params.name}&email=${params.email}&age=${params.age}`);
  };

  // const handleUpdate = async (user) => {
  // this.navigate({
  //     url: `/employees/edit/${userId}
    //   id: userId,
    //   name: user.name,
    //   age: user.age,
    // });
  // };


  const handleDelete = async (userId) => {
    const confirm = window.confirm(
      "Are you sure wan to delete this user ? ",
      userId
    );
    if (confirm) {
      const response = await axios.delete(`${baseURL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // window.location.reload(false);

        const newUsers = users.filter((user) => user.userId !== userId);
        setUsers(newUsers);
        console.log(response.data);
      } else if (response.status === 404) {
        console.log(response.data);
      }
    }
  };

  if (error) throw error;
  if (loading) return <LoadingIndicator />;
  if (users.length === 0) return <PageNotFound />;

  return (
    <Box
      sx={{
        height: "20rem",
        maxWidth: "150rem",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Box
        sx={{
          height: "20rem",
          minWidth: "65rem",
          m: 2,
          display: "flex",
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          editMode="row"
        // editRowsModel={editRowsModel}
        // onEditRowsModelChange={handleEditRowsModelChange}
        />
        {/* <Alert severity="info" style={{ marginBottom: 8 }}>
          <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
        </Alert> */}
      </Box>
    </Box>
  );
};

export default EmployeeTable;
