import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { lightBlue } from "@mui/material/colors";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 25,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const DepartmentCRUD = () => {
  var date = new Date();

  const [name, setDeptName] = useState("Unknown");
  const [user, setUser] = useState();
  const [created_at, setCreateDate] = useState(date);
  const [updated_at, setUpdateDate] = useState();
  const [isPending, setIsPending] = useState(false);

  const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
  const deptListUrl = `${baseURL}/departments`;
  const getDeptURL = `${baseURL}/department`;

  const [DepartmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    (async function () {
      const dept = await axios({
        url: `${deptListUrl}`,
        method: "get",
      });
      setDepartmentList(dept.data);
    })();
  }, []);

  //Fetch user
  useEffect(() => {
    (async function () {
      const res = await axios({
        url: `${baseURL}/users`,
        method: "get",
      });
      setUser(res.data.results);
    })();
  }, []);

  const display = DepartmentList.map((item) => (
    <TableRow
      key={item._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell scope="row">{item.name}</TableCell>
      <TableCell>
        Fullname
        <IconButton size="small">
          <EditIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  // function remove(id) {
  //   // console.log(id);
  //   axios
  //     .delete(getDeptURL + "/" + id)
  //     .then((res) => {
  //       console.log(res.data);
  //       const myalldata = DepartmentList.filter((item) => item._id !== id);
  //       setDepartmentList(myalldata);
  //     })
  //     .catch((err) => console.error(err));
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const department = {
  //     name,
  //     created_at,
  //     updated_at,
  //   };

  //   setIsPending(true);

  //   try {
  //     const response = await axios.post(
  //       getDeptURL,
  //       JSON.stringify(department),
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log(response);
  //     console.log("New depaerment added");
  //     setIsPending(false);
  //   } catch (error) {
  //     console.log(`ERROR: ${error}`);
  //   }
  // };

  return (
    <Box>
      {/* <Box
        sx={{
          margin: "2rem 3rem",
          padding: "2rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <TextField
              id="outlined-basic"
              type="text"
              label="New Department"
              variant="outlined"
              name="name"
              onChange={(e) => setDeptName(e.target.value)}
              size="small"
              sx={{
                width: "20rem",
                alignSelf: "center",
              }}
            />
            <Button type="submit" variant="text" sx={{ marginLeft: "1rem" }}>
              <AddIcon />
            </Button>
          </Box>
        </form>
      </Box> */}
      <Box
        sx={{
          border: 1,
          borderColor: "white",
          boxShadow: 4,
          borderRadius: "25px",
          margin: "2rem 3rem",
          padding: "2rem",
        }}
      >
        <TitleFrame>Departments</TitleFrame>
        <TableContainer sx={{ width: "50%", marginLeft: "3rem" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Assign</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>{display}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DepartmentCRUD;
