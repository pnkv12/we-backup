import React, { useEffect, useState } from "react";
// import useFetch from "../../services/useFetch";
import useAxios from "../../services/useAxios";
import LoadingIndicator from "../../components/Loading";
import PageNotFound from "../../components/errorHandling/PageNotFound";
import DepartmentD from "./DepartmentD";
import CategoryD from "./CategoryD";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";

// cài mui lab ms xài dc Tabs => npm i @mui/lab

const Dashboard = () => {
  // const { data: ideas, loading, error } = useFetch("idea");
  const { response, loading, error } = useAxios({
    url: "ideas",
    method: "get",
  });

  const [ideas, setIdeas] = useState([]);
  const [value, setValue] = useState("department");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (response != null) {
      setIdeas(response);
    }
  }, [response]);

  if (error) throw error;
  if (loading) return <LoadingIndicator />;
  // if (ideas.length === 0) return <PageNotFound />;

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Department" value="department" />
            <Tab label="Category" value="category" />
            <Tab label="Download" value="download" />
          </TabList>
        </Box>
        <TabPanel value="department">
          <DepartmentD />
        </TabPanel>
        <TabPanel value="category">
          <CategoryD />
        </TabPanel>
        <TabPanel value="download">
          Closure Date: 13/12/2023 {} <Button>Download (.csv)</Button>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Dashboard;
