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

const baseURL = "http://localhost:8000/v1.0";

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
  // let password = searchParams.get("password");
  let role = searchParams.get("role");
  let dept = searchParams.get("dept");
  let navigate = useNavigate();

  const [user, setUser] = useState({
    fullname,
    email,
    // password,
    role,
    dept,
  });

  useEffect(() => {
    setUser({
      fullname,
      email,
      // password,
      role,
      dept,
    });
  }, [fullname, email, role, dept]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user != null) {
      axios({
        method: "patch",
        url: `${baseURL}/user/${userId}`,
        data: user,
      }).then((response) => {
        sessionStorage.setItem("fullname", JSON.stringify(fullname));
        sessionStorage.setItem("email", JSON.stringify(email));
        sessionStorage.setItem("role", JSON.stringify(role));
        sessionStorage.setItem("dept", JSON.stringify(dept));
        navigate("/employees");
        window.location.reload();
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
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Role
            </InputLabel>
            <NativeSelect
              defaultValue={user?.role}
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
              defaultValue={user?.dept}
              inputProps={{
                name: "department_id",
                id: "uncontrolled-native",
              }}
              onChange={(e) => setUser({ ...user, departId: e.target.value })}
            >
              <option value={"6249c9dcabe8dbf2e9785f4c"}>IT Lab</option>
              <option value={"6249cd25abe8dbf2e9785f8b"}>Business Room</option>
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
