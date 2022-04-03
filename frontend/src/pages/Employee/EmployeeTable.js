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

const baseURL = "https://33c6-171-232-148-95.ap.ngrok.io/v1.0";
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
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          role_id: "Có mà chưa gắn dô FE",
          department_id: "Có mà chưa gắn dô FE",
        };
      });
      setUsers(userList);
    }
  }, [response]);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex" }}>
            <Button
              title="edit"
              variant="text"
              color="secondary"
              onClick={() => handleUpdate(params.row)}
              fontSize="small"
              size="small"
            >
              <EditIcon />
            </Button>
            <Button
              title="delete"
              variant="text"
              color="error"
              onClick={() => handleDelete(params.row.userId)}
              fontSize="small"
              size="small"
            >
              <HighlightOffIcon />
            </Button>
          </Box>
        );
      },
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 250, editable: true },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 200,
      editable: true,
    },
    {
      field: "role_id",
      headerName: "Role",
      width: 200,
      editable: true,
    },
    {
      field: "department_id",
      headerName: "Department",
      width: 200,
      editable: true,
    },
    // { field: "role", headerName: "Role", width: 180, editable: true },
  ];

  const handleUpdate = async (params) => {
    navigate(`edit/${params.userId}?username=${params.username}&email=${params.email}&fullname=${params.fullname}&password=${params.password}&role=${params.role_id}&dept=${params.department_id}
  `);
  };

  // const handleUpdate = async (userId) => {
  //   this.navigate({
  //     url: `/employees/edit/${userId}`,
  //     username: user.username,
  //     password: user.password,
  //     fullname: user.fullname,
  //   });
  // };

  const handleDelete = async (userId) => {
    const confirm = window.confirm(
      "Are you sure want to delete this user ? ",
      userId
    );
    if (confirm) {
      const response = await axios.delete(`${baseURL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || 204 || 201) {
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
