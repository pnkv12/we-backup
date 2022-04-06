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
// import Search from "@mui/icons-material/Search";
import SearchFunction from "../../components/Search/SearchFunction";
// import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro";
// import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import { textAlign } from "@mui/system";

const baseURL = "https://1d65-14-226-238-211.ap.ngrok.io/v1.0";
const pageSize = 5;
const rowsPerPageOptions = [5];

const EmployeeTable = (props) => {
  const navigate = useNavigate();
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
          roleId: user.role_id,
          departId: user.department_id,
        };
      });

      setUsers(userList);
    }
  }, [response]);

  const handleUpdate = async (params) => {
  //     navigate(`edit/${params.userId}?email=${params.email}&fullname=${params.fullname}&role=${params.roleId}&dept=${params.departId}
  // `);
          navigate(`edit/${params.userId}?email=${params.email}&fullname=${params.fullname}&role=${params.roleId}&dept=${params.departId}
  `);
  };

  // const handleUpdate = async (params) => {
  //   navigate(`/employees/edit/${params.userId}`);
  //   console.log(params.userId);
  // };

  const handleDelete = async (userId) => {
    const confirm = window.confirm(
      "Are you sure want to delete this user?",
      userId
    );
    if (confirm) {
      const response = await axios.delete(`${baseURL}/user/${userId}`);
      if (response.status === 200 || 204 || 201) {
        // window.location.reload(false);

        const newUsers = users.filter((user) => user.userId !== userId);
        setUsers(newUsers);
        console.log(response.data);
      } else if (response.status === 404 || 500 || 401 || 403) {
        console.log(response.data);
      }
    }
  };

  if (error) throw error;
  if (loading) return <LoadingIndicator />;
  if (users.length === 0) return <PageNotFound />;

  const columns = [
    {
      field: "action",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        if (sessionStorage.getItem("role") !== "6248fd5cb7d420daa06ee42d") {
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
        } else {
          return null;
        }
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
      field: "roleId",
      headerName: "Role",
      width: 200,
      editable: true,
    },
    {
      field: "departId",
      headerName: "Department",
      width: 200,
      editable: true,
    },
  ];

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
        />
      </Box>
    </Box>
  );
};

export default EmployeeTable;
