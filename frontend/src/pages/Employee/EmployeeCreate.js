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

axios.defaults.baseURL = "http://localhost:8000/";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

export default function EmployeeCreate(props) {
  let navigate = useNavigate();
  // const token = window.localStorage.getItem('authToken');
  // const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);
  // const { response, loading, error } = useAxios({
  //     url: "users",
  //     method: "post",
  //     body: user,
  //     // headers: { token: token }
  // });

  const createUser = () => {
    if (user != null) {
      axios({
        method: "post",
        url: "http://localhost:8000/users",
        data: user,
      }).then((response) => {
        if (response.status === 201) {
          // console.log('Khang')
          // console.log('Khang')
          // console.log('Khang')
          // console.log('Khang')
          // console.log('Khang')
          // console.log(response);
          // setResult(response);
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
  // if (loading) return <LoadingIndicator />;
  // if (result.length === 0) return <PageNotFound />;

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
            name="name"
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
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
            type="number"
            label="Age"
            variant="outlined"
            name="age"
            placeholder="Age"
            onChange={(e) => setUser({ ...user, age: e.target.value })}
            size="small"
            required
          />
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
          {/* <p>
                        {result !== null ? result : 'Invalid'}
                    </p> */}
        </Box>
      </form>
    </Box>
  );
}
