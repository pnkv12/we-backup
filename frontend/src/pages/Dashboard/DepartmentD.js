import React, { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import styled from "@emotion/styled";
import { lightBlue } from "@mui/material/colors";
import { Box, Divider } from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { dashboardFlex } from "../../styles/boxStyles";

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
    </FormControl>
  );
}

function DepartmentD() {
  const [ideas, setIdeas] = useState({});
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    (async function () {
      const deptData = await axios({
        url: `${baseURL}/departments`,
        method: "get",
      });
      setDepartmentList(deptData.data);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const res = await axios({
        url: `${baseURL}/ideas`,
        method: "get",
      });
      setIdeas(res.data); // return res.data.length;
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DeptDropDown departmentList={departmentList} />
          <Box sx={{ marginLeft: "3rem" }}>Total ideas: {ideas.length}</Box>
        </Box>
        {/* Dynamic detail panel sort by DeptDropDown*/}
        <Box sx={dashboardFlex}>
          {/* Idea with most thumbs and comments in the department*/}
          <Box>Most popular: N/A</Box>

          {/* Idea with most views within department*/}
          <Box>Most views: N/A</Box>

          {/* Newest idea posted by user in this department */}
          <Box>Latest idea: N/A</Box>

          {/* Newest comment in an idea of this department */}
          <Box>Latest comment: N/A</Box>
        </Box>
      </Box>

      <Box
        sx={{
          alignSelf: "center",
          position: "relative",
          margin: "auto",
          padding: "2rem 2rem 2rem 2rem",
          width: "20rem",
          height: "23rem",
          boxShadow: 4,
          borderRadius: "25px",
        }}
      >
        <PieChart
          data={{
            labels: departmentList.map((departmentList) => departmentList.name),
            datasets: [
              {
                //number of ideas belong to that dept
                data: [6, 3, 9],
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
