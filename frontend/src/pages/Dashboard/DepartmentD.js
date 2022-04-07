import React, { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { lightBlue } from "@mui/material/colors";
import { Box, Divider } from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

function DeptDropDown({ departmentList }) {
  const [department, setDepartment] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(department);
  };
  const handleChange = (e) => {
    setDepartment(e.target.value);
  };

  return (
    <FormControl
      onSubmit={handleSubmit}
      sx={{ width: "10rem", display: "inline-flex" }}
    >
      <InputLabel id="demo-simple-select-label">View By</InputLabel>
      <Select
        value={department}
        id="demo-simple-select"
        labelId="demo-simple-select-label"
        label="View By"
        onChange={handleChange}
      >
        {departmentList.map((department) => (
          <MenuItem key={department._id} value={department.name}>
            {department.name}
          </MenuItem>
        ))}
      </Select>
      {/* <Button variant="outlined" type="submit">
        View
      </Button> */}
    </FormControl>
  );
}

function DepartmentD() {
  const [ideas, setIdeas] = useState({});
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios({
        url: `${baseURL}/departments`,
        method: "get",
      });
      setDepartmentList(response.data);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const res = await axios({
        url: `${baseURL}/ideas`,
        method: "get",
      });
      setIdeas(res.data);
      console.log(res);
    })();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        p: 1,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          paddingLeft: "3rem",
        }}
      >
        <TitleFrame>Statistical Analysis - Department</TitleFrame>
        <Divider
          sx={{
            marginBottom: "2rem",
          }}
        ></Divider>
        <Box>
          <DeptDropDown departmentList={departmentList} />
        </Box>
        {/* Dynamic detail panel */}
        <Box
          sx={{
            boxShadow: "4",
            borderRadius: "25px",
            maxWidth: "60%",
            width: "60%",
            margin: "3rem",
            padding: "2rem",
            bgcolor: "lightBlue",
          }}
        >
          {/* Number of ideas by employees who belongs in a department */}
          <span>Ideas:</span>
          <br />
          {/* Idea with most thumbs and comments in the department*/}
          <span>Most popular: N/A</span>
          <br />
          {
            //ideas.filter()
          }

          {/* Idea with most views within department*/}
          <span>Most views: N/A</span>
          <br />

          {/* Newest idea posted by user in this department */}
          <span>Latest idea: N/A</span>
          <br />

          {/* Newest comment in an idea of this department */}
          <span>Latest comment: N/A</span>
        </Box>
      </Box>

      <Box
        sx={{
          alignSelf: "center",
          position: "relative",
          margin: "auto",
          padding: "2rem 2rem 2rem 2rem",
          width: "25rem",
          height: "28rem",
          boxShadow: 4,
          borderRadius: "25px",
        }}
      >
        {/* <p>Total ideas: {ideas.length} </p> */}
        <PieChart
          data={{
            labels: departmentList.map((departmentList) => departmentList.name),
            datasets: [
              {
                //number of ideas belong to that dept
                data: [6, 3],
                backgroundColor: ["red", "blue", "green", "yellow"],
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
}
export default DepartmentD;
