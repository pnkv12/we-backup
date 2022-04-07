import React, { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import DeptDropDown from "./Dropdown";
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

const Department = () => {
  const [ideas, setIdeas] = useState({});
  const [departmentList, setDepartmentList] = useState([]);

  const { response, loading, error } = useAxios({
    url: "ideas",
    method: "get",
  });

  useEffect(() => {
    (async function () {
      const response = await axios({
        url: `${baseURL}/departments`,
        method: "get",
      });
      setDepartmentList(response.data);
    })();
  }, []);

  // useEffect(() => {
  //   if (response != null) {
  //     console.log(response);
  //     const ideaList = response.map((idea) => {
  //       return {
  //         ideaId: idea._id,
  //         view: idea.total_view,
  //         reaction: idea.total_reaction,
  //       };
  //     });
  //     setIdeas(ideaList);
  //   }
  // }, [response]);

  return (
    <Box
      sx={{
        display: "flex",
        p: 1,
        justifyContent: "center",
      }}
    >
      <p>Lấy tổng ideas của mỗi department (theo department_id của user)</p>

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
          <span>
            Ideas:
            {ideas.length}
          </span>
          {/* Idea with most thumbs and comments in the department*/}
          <span>Most likes: N/A</span>
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
        <PieChart
          data={{
            // take the name in department table
            labels: departmentList.map((department) => department.name),
            datasets: [
              {
                //number of ideas belong to that department
                data: [6, 7],
                backgroundColor: ["red", "blue", "green", "yellow"],
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
};

export default Department;
