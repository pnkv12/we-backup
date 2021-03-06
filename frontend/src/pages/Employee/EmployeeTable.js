import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import LoadingIndicator from "../../components/Loading";
import PageNotFound from "../../components/errorHandling/PageNotFound";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import useAxios from "../../services/useAxios";
import CreateStaffBtn from "../../components/Staff/StaffButtons";

import { useNavigate } from "react-router-dom";

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const pageSize = 5;
const rowsPerPageOptions = [5];

const EmployeeTable = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  // const [roleData, setRoleData] = useState([]);
  // const [departmentData, setDepartmentData] = useState([]);

  const { response, loading, error } = useAxios({
    url: "users",
    method: "get",
  });

  // useEffect(() => {
  //   (async function () {
  //     const roleRes = await axios({
  //       url: `${baseURL}/roles`,
  //       method: "get",
  //     });
  //     setRoleData(roleRes.data);
  //     // console.log(roleRes.data.length);
  //   })();

  //   (async function () {
  //     const depRes = await axios({
  //       url: `${baseURL}/departments`,
  //       method: "get",
  //     });
  //     setDepartmentData(depRes.data);
  //   })();
  // }, []);

  useEffect(() => {
    if (response != null) {
      const userList = response.map((user, id) => {
        return {
          id: id + 1,
          userId: user._id,
          username: user.username,
          // password: user.password,
          email: user.email,
          fullname: user.fullname,
          roleId: user.role_id,
          rolename: user.role_name,
          departId: user.department_id,
          departname: user.department_name,
        };
      });
      setUsers(userList);
    }
  }, [response]);

  const handleUpdate = async (params) => {
    //   navigate(`edit/${params.userId}?email=${params.email}&fullname=${params.fullname}&role=${params.roleId}&dept=${params.departId}&password=${params.password}
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
        // console.log(response.data);
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
      headerName: <CreateStaffBtn />,
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex" }}>
            <IconButton
              title="edit"
              color="secondary"
              onClick={() => handleUpdate(params.row)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              title="delete"
              color="error"
              onClick={() => handleDelete(params.row.userId)}
            >
              <HighlightOffIcon />
            </IconButton>
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
      field: "rolename",
      headerName: "Role",
      width: 150,
      editable: true,
    },
    {
      field: "departname",
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
          height: "23rem",
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
        />
      </Box>
    </Box>
  );
};

export default EmployeeTable;
