import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchFunction from "../../components/Search/SearchFunction";
// import EnhancedTable from "./EmployeeTable";
import CreateStaffBtn from "../../components/Staff/StaffButtons";
import EmployeeTable from "./EmployeeTable";
import { Box, Divider } from "@mui/material";
import StaffDetails from "../../components/Staff/StaffDetails";
import StaffList from "../../components/Staff/StaffList";
import CreateStaff from "../../components/Staff/CreateStaff";
// import EmployeeList from "./EmployeeList";
import { employeeBoxStyle } from "../../styles/boxStyles";

const Employees = () => {
  // const searchParams = useSearchParams();

  return (
    <Box>
      <Box
        sx={employeeBoxStyle}
      >
        <SearchFunction page="employees"></SearchFunction>
        <CreateStaffBtn />
      </Box>

      <EmployeeTable></EmployeeTable>

      {/* <StaffDetails /> */}
      {/* <StaffList /> */}
      {/* <CreateStaff /> */}

      {/* <EnhancedTable></EnhancedTable> */}
    </Box>
  );
};

export default Employees;
