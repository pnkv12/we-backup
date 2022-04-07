import React, { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import CateDD from "./Dropdown";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { lightBlue } from "@mui/material/colors";
import { Box, Divider } from "@mui/material";
import axios from "axios";
import useAxios from "../../services/useAxios";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  // textAlign: "left",
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

const CategoryD = () => {
  

  // const { res } = useAxios({
  //   url: "ideas",
  //   method: "get",
  // });

  // useEffect(() => {
  //   if (res != null) {
  //     const ideaList = response.map((idea) => {
  //       return {
  //         ideaId: idea._id,
  //         view: idea.total_view,
  //         reaction: idea.total_reaction,
  //       };
  //     });

  //     setIdeas(ideaList);
  //   }
  // }, [res]);

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
        <TitleFrame>Statistical Analysis - Category</TitleFrame>
        <Divider
          sx={{
            marginBottom: "2rem",
          }}
        ></Divider>
        <Box>
          <CateDD />
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
          {/* <span>
          Ideas:
          {ideas.length}
        </span> */}
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
        <Box>
          Closure Date: {} <button>Download (.csv)</button>
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
        <PieChart />
      </Box>
    </Box>
  );
};
export default CategoryD;
