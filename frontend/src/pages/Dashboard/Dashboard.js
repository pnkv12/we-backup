import React, { useEffect, useState } from "react";
// import useFetch from "../../services/useFetch";
import useAxios from "../../services/useAxios";
import LoadingIndicator from "../../components/Loading";
import PageNotFound from "../../components/errorHandling/PageNotFound";
// import TabsCombo from "./TabsCombo";
import Department from "./Department";
import CategoryD from "./CategoryD";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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
  if (ideas.length === 0) return <PageNotFound />;

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Department" value="department" />
            <Tab label="CategoryCreate" value="category" />
          </TabList>
        </Box>
        <TabPanel value="department">
          <Department />
        </TabPanel>
        <TabPanel value="category">
          <CategoryD />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Dashboard;
