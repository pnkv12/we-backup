import { Search } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../components/errorHandling/PageNotFound";
import LoadingIndicator from "../components/Loading";
// import NavBar from "../components/Header/NavBar";
// import useFetch from '../services/useFetch';
import useAxios from "../services/useAxios";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Box, Divider } from "@mui/material";

const Home = () => {
  const { response, loading, error } = useAxios({
    url: "ideas",
    method: "get",
  });

  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    if (response != null) {
      setIdeas(response);
    }
  }, [response]);

  if (error) throw error;
  if (loading) return <LoadingIndicator />;
  if (ideas.length === 0) return <PageNotFound />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 1,
        p: 3,
      }}
    >
      <h1>Welcome</h1>
      <img
        src="images/jztr.png"
        style={{
          height: "20rem",
          width: "20rem",
        }}
      ></img>
      <Box id="filters">
        <label htmlFor="category">Filter by:</label>{" "}
        <select
          id="size"
          // value={category}
          onChange={() => {}}
        >
          <option value="Latest Ideas">Latest Ideas</option>
          <option value="Latest Comments">Latest Comments</option>
          <option value="Most Popular">Most Popular</option>
          <option value="Most Viewed">Most Viewed</option>
          <option value="Most Recent">Most Recent</option>
          <option value="Most Comments">Most Comments</option>
          <option value="CategoryCreate">CategoryCreate</option>
        </select>
        {/* {category && <h2>Found {filteredProducts.length} items</h2>} */}
      </Box>
      <Box id="filters">
        <label htmlFor="category">CategoryCreate:</label>{" "}
        <select
          id="size"
          // value={category}
          onChange={() => {}}
        >
          <option value="Teaching">Teaching</option>
          <option value="Office">Office</option>
          <option value="Red">Red</option>
          <option value="Red">Red</option>
          <option value="Red">Red</option>
        </select>
      </Box>
    </Box>
  );
};

export default Home;
