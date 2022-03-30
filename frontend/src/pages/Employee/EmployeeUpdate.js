import Axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { boxCreate } from "../../styles/boxStyles";
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
// import useAxios from "../../services/useAxios";
// import LoadingIndicator from "../../components/Loading";
// import PageNotFound from "../../components/errorHandling/PageNotFound";
import axios from "axios";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { lightBlue } from "@mui/material/colors";
import styled from "@emotion/styled";
import SaveIcon from "@mui/icons-material/Save";

const token = window.localStorage.getItem('authToken');
axios.defaults.baseURL = "http://localhost:8000/";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

export default function EmployeeUpdate(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  let { userId } = useParams();

  let name = searchParams.get('name')
  let email = searchParams.get('email')
  let age = searchParams.get('age')

  let navigate = useNavigate();
  const [user, setUser] = useState({
    name,
    email,
    age,
  });

  useEffect(() => {
    setUser({
      name,
      email,
      age,
    })
    console.log(user)
  }, [name, email, age])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (user != null) {
      axios({
        method: "patch",
        url: `http://localhost:8000/users/${userId}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      }).then((response) => {
        navigate('/employees')
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
            // placeholder={user?.name}
            variant="outlined"
            name="name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            size="small"
            value={user?.name}
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
          <TextField
            id="outlined-basic"
            type="number"
            value={user?.age}
            variant="outlined"
            name="age"
            placeholder="Age"
            onChange={(e) => setUser({ ...user, age: e.target.value })}
            size="small"
          />
          {/* <br />
          <TextField
            id="outlined-basic"
            type="number"
            value={user?.password}
            variant="outlined"
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            size="small"
          /> */}
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
