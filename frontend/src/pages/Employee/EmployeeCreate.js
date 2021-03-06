import Axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { boxCreate } from "../../styles/boxStyles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAxios from "../../services/useAxios";
import LoadingIndicator from "../../components/Loading";
import PageNotFound from "../../components/errorHandling/PageNotFound";
import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { lightBlue } from "@mui/material/colors";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

export default function EmployeeCreate(props) {
  let navigate = useNavigate();
  // const [result, setResult] = useState(null);
  const [user, setUser] = useState({});

  // router.get("/roles", roleController.getAllRole); //? Get all roles
  // const [role, setRole] = useState();
  const [roleData, setRoleData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios({
        url: `${baseURL}/roles`,
        method: "get",
      });
      console.log(response.data);
      setRoleData(response.data);
    })();

    (async function () {
      const response = await axios({
        url: `${baseURL}/departments`,
        method: "get",
      });
      setDepartmentData(response.data);
    })();
  }, []);

  const createUser = () => {
    if (user != null) {
      axios({
        method: "post",
        url: `${baseURL}/register`,
        data: user,
      }).then((response) => {
        if (response.status === 201 || 204 || 200) {
          navigate("/employees");
        } else {
          console.log("Cannot create");
        }
      });

      // if (response.status === 201) {
      // }
    }
  };

  // if (error) throw error;

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <Box sx={boxCreate}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: 2,
          }}
        >
          <TitleFrame>Create New Staff Account</TitleFrame>
          <Divider sx={{ m: 2 }}></Divider>
          <TextField
            id="outlined-basic"
            type="text"
            label="Name"
            variant="outlined"
            name="fullname"
            placeholder="Full Name"
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            size="small"
            required
          />
          <br />
          <TextField
            id="outlined-basic"
            type="text"
            label="Email"
            variant="outlined"
            name="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            size="small"
            required
          />
          <br />
          <TextField
            id="outlined-basic"
            type="text"
            label="Username"
            variant="outlined"
            name="username"
            placeholder="Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            size="small"
            required
          />
          <br />
          <TextField
            id="outlined-basic"
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            size="small"
            required
          />
          <br />
          <TextField
            id="outlined-basic"
            type="password"
            label="confirmPassword"
            variant="outlined"
            name="confirmPassword"
            placeholder="confirmPassword"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            size="small"
            required
          />
          <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>

            <Select
              // value={role}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
              name="role_id"
              onChange={(e) => setUser({ ...user, roleId: e.target.value })}
            >
              {roleData.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Department"
              name="department_id"
              onChange={(e) => setUser({ ...user, departId: e.target.value })}
            >
              {departmentData.map((department) => (
                <MenuItem key={department._id} value={department._id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginRight: "1rem" }}
              size="medium"
            >
              <PersonAddAltIcon />
            </Button>

            <Button
              component={RouterLink}
              to="/employees"
              variant="contained"
              color="secondary"
              size="medium"
            >
              <ReplayRoundedIcon />
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
