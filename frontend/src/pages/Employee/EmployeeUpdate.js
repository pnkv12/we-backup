import Axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { boxCreate } from "../../styles/boxStyles";
import {
  Link as RouterLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
// import useAxios from "../../services/useAxios";
// import LoadingIndicator from "../../components/Loading";
// import PageNotFound from "../../components/errorHandling/PageNotFound";
import axios from "axios";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { lightBlue } from "@mui/material/colors";
import styled from "@emotion/styled";
import SaveIcon from "@mui/icons-material/Save";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// const token = window.localStorage.getItem("authToken");
axios.defaults.baseURL = "https://33c6-171-232-148-95.ap.ngrok.io/v1.0/";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

export default function EmployeeUpdate(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  let { userId } = useParams();

  let fullname = searchParams.get("fullname");
  let email = searchParams.get("email");
  // let username = searchParams.get("username");
  let password = searchParams.get("password");
  let role = searchParams.get("role_id");
  let dept = searchParams.get("department_id");

  let navigate = useNavigate();
  const [user, setUser] = useState({
    fullname,
    email,
    password,
    role,
    dept,
  });

  useEffect(() => {
    setUser({
      fullname,
      email,
      password,
      role,
      dept,
    });
    console.log(user);
  }, [fullname, email, password, role, dept]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user != null) {
      axios({
        method: "patch",
        url: `https://33c6-171-232-148-95.ap.ngrok.io/v1.0/user/${userId}`,
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
        data: JSON.stringify(user),
      }).then((response) => {
        navigate("/employees");
      });
    }
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
          <TitleFrame>Update Staff Account</TitleFrame>
          <Divider sx={{ m: 2 }}></Divider>
          <TextField
            id="outlined-basic"
            type="text"
            variant="outlined"
            name="fullname"
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            size="small"
            value={user?.fullname}
          />
          <br />
          <TextField
            id="outlined-basic"
            type="text"
            value={user?.email}
            variant="outlined"
            name="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            size="small"
          />
          <br />
          {/* <TextField
            id="outlined-basic"
            type="text"
            value={user?.username}
            variant="outlined"
            name="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            size="small"
          />
          <br /> */}
          <TextField
            id="outlined-basic"
            type="password"
            value={user?.password}
            variant="outlined"
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            size="small"
          />
          <br />
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Role
            </InputLabel>
            <NativeSelect
              defaultValue={user?.role_id}
              inputProps={{
                name: "role_id",
                id: "uncontrolled-native",
              }}
              onChange={(e) => setUser({ ...user, roleId: e.target.value })}
            >
              <option value={"6248fd50b7d420daa06ee42b"}>Admin</option>
              <option value={"62482a63ad01d9a46b24608b"}>QAM</option>
              <option value={"62482516ad01d9a46b246089"}>Coordinator</option>
              <option value={"6248fd5cb7d420daa06ee42d"}>Staff</option>
            </NativeSelect>
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Department
            </InputLabel>
            <NativeSelect
              defaultValue={user?.department_id}
              inputProps={{
                name: "department_id",
                id: "uncontrolled-native",
              }}
              onChange={(e) => setUser({ ...user, departId: e.target.value })}
            >
              <option value={"6248fd50b7d420daa06ee42b"}>Mặc định</option>
              <option value={"62482a63ad01d9a46b24608b"}>Chọn 1</option>
            </NativeSelect>
          </FormControl>
          <br />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginRight: "1rem" }}
              size="medium"
            >
              <SaveIcon />
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
