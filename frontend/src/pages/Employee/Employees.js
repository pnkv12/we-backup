import React from "react";
import { useSearchParams } from "react-router-dom";
import CreateStaffBtn from "../../components/Staff/StaffButtons";
import EmployeeTable from "./EmployeeTable";
import { Box, Divider } from "@mui/material";
import { employeeBoxStyle } from "../../styles/boxStyles";

function Employees() {
  return (
    <Box sx={employeeBoxStyle}>
      <EmployeeTable></EmployeeTable>
    </Box>
  );
}

export default Employees;
