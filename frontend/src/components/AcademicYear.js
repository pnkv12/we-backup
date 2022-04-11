import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { lightBlue } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import { Link as RouterLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import "react-datepicker/dist/react-datepicker.css";
import TableBody from "@mui/material/TableBody";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// import Category from "./Category/Category";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

const AcademicYear = () => {
  var date = new Date();

  const [name, setName] = useState("2022 Year");
  const [closureDate, setClosureDate] = useState(new Date());

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  const [isPending, setIsPending] = useState(false);

  const cateListUrl = `${baseURL}/categories`;
  const getCateURL = `${baseURL}/category`;
  const [CategoryList, setCategory] = useState([]);

  const academicYearListUrl = `${baseURL}/academicYear`;
  const [AcademicYearList, setAcademicYearList] = useState([]);

  useEffect(() => {
    axios
      .get(cateListUrl)
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(academicYearListUrl)
      .then((res) => {
        setAcademicYearList(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const display = AcademicYearList.map((item) => (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>{item.closureDate}</td>
      <td>
        <Button variant="text" color="error" onClick={() => remove(item._id)}>
          <HighlightOffIcon />
        </Button>
      </td>
    </tr>
  ));

  function remove(id) {
    axios
      .delete(getCateURL + "/" + id)
      .then((res) => {
        console.log(res.data);
        const myalldata = CategoryList.filter((item) => item._id !== id);
        setCategory(myalldata);
      })
      .catch((err) => console.error(err));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const academic_year = {
      name,
      closureDate,
    };

    setIsPending(true);

    try {
      const response = await axios.post(
        `${baseURL}/academicYear`,
        JSON.stringify(academic_year),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      console.log("New academic added");
      setIsPending(false);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          border: 1,
          borderColor: "white",
          boxShadow: 4,
          borderRadius: "25px",
          margin: "2rem 3rem",
          padding: "2rem",
          maxWidth: "100%",
        }}
      >
        <TitleFrame>Create Academic Year</TitleFrame>

        <Divider
          sx={{
            marginBottom: "1.5rem",
          }}
        />

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="outlined-basic"
              type="text"
              label="New Academic Year"
              variant="outlined"
              name="name"
              onChange={(e) => setName(e.target.value)}
              size="small"
              sx={{
                width: "50%",
                alignSelf: "center",
              }}
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                sx={{ marginLeft: "1rem", marginRight: "1rem" }}
              >
                Create
              </Button>

              <Button
                component={RouterLink}
                to="/"
                variant="contained"
                color="secondary"
                sx={{ margin: "1rem 0rem" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <DatePicker
              selected={closureDate}
              onChange={(date) => setClosureDate(date)}
              onCalendarClose={handleCalendarClose}
              onCalendarOpen={handleCalendarOpen}
            />
          </Box>
        </form>
      </Box>
      <Box
        sx={{
          border: 1,
          borderColor: "white",
          boxShadow: 4,
          borderRadius: "25px",
          margin: "2rem 3rem",
          padding: "2rem",
          maxWidth: "100%",
        }}
      >
        <TitleFrame>Academic Year List</TitleFrame>
        <TableContainer sx={{ width: "60%", marginLeft: "3rem" }}>
          <Table aria-label="simple table">
            <TableBody>{display}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AcademicYear;
