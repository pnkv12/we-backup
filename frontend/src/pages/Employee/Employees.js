import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchFunction from "../../components/Search/SearchFunction";
import CreateStaffBtn from "../../components/Staff/StaffButtons";
import EmployeeTable from "./EmployeeTable";
import { Box, Divider } from "@mui/material";
import { employeeBoxStyle } from "../../styles/boxStyles";

function Employees() {
  const getRole = sessionStorage.getItem("role");

  if (getRole !== "6248fd5cb7d420daa06ee42d") {
    return (
      <Box>
        <Box sx={employeeBoxStyle}>
          <SearchFunction page="employees"></SearchFunction>
          <CreateStaffBtn />
        </Box>
        <EmployeeTable></EmployeeTable>
      </Box>
    );
  } else {
    return (
      <Box>
        <Box sx={employeeBoxStyle}>
          <SearchFunction page="employees"></SearchFunction>
        </Box>
        <EmployeeTable></EmployeeTable>
      </Box>
    );
  }
}

export default Employees;
