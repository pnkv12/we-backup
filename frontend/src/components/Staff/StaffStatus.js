import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import useAxios from "../../services/useAxios";
import axios from "axios";
import LoadingIndicator from "../Loading";
import PageNotFound from "../errorHandling/PageNotFound";
import { DataGrid } from "@mui/x-data-grid";

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const pageSize = 5;
const rowsPerPageOptions = [5];

function StaffStatus() {
  const getRole = sessionStorage.getItem("role");
  const QCDepartment = sessionStorage.getItem("department");

  const navigate = useNavigate();
  const [users, setUsers] = useState({});

  const { response, loading, error } = useAxios({
    url: "users",
    method: "get",
  });

  const userList = [];

  useEffect(async () => {
    if (response != null) {
      console.log(response.data);

      const userList = response.map((user, id) => {
        return {
          id: id + 1,
          userId: user._id,
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          roleId: user.role_id,
          roleName: user.role_name,
          departId: user.department_id,
          departmentName: user.department_name,
          ideaSubmitted: 0,
        };
      });

      await axios.get(`${baseURL}/ideas`).then((response) => {
        for (const user of userList) {
          const ideaOfThisUser = response.data.filter(
            (idea) => idea.user_id === user.userId
          );
          user.ideaSubmitted = ideaOfThisUser.length;
          console.log(user.ideaSubmitted);
        }
        const usersOfThisDepartment = userList.filter(
          (user) => user.departId === QCDepartment
        );
        setUsers(usersOfThisDepartment);
      });
    }
  }, [response]);

  const handleUpdate = async (params) => {
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
      field: "roleName",
      headerName: "Role",
      width: 200,
      editable: true,
    },
    {
      field: "departmentName",
      headerName: "Department",
      width: 200,
      editable: true,
    },
    {
      field: "ideaSubmitted",
      headerName: "Idea Submitted",
      width: 200,
      editable: true,
    },
  ];

  return (
    <Box
      sx={{
        height: "50rem",
        maxWidth: "500rem",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
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
  );
}

export default StaffStatus;
