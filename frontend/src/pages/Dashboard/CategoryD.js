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
import Select, { SelectChangeEvent } from "@mui/material/Select";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  // textAlign: "left",
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

export function CateDD({ categoryList }) {
  const [category, setCategory] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(category);
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <FormControl
      onSubmit={handleSubmit}
      sx={{ width: "10rem", display: "inline-flex" }}
    >
      <InputLabel id="demo-simple-select-label">View By</InputLabel>
      <Select
        value={category}
        id="demo-simple-select"
        labelId="demo-simple-select-label"
        label="View By"
        onChange={handleChange}
      >
        {categoryList.map((category) => (
          <MenuItem key={category._id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      {/* <Button variant="outlined" type="submit">
          View
        </Button> */}
    </FormControl>
  );
}

function CategoryD() {
  // const [ideas, setIdeas] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios({
        url: `${baseURL}/categories`,
        method: "get",
      });
      setCategoryList(response.data);
    })();
  }, []);

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
          <CateDD categoryList={categoryList} />
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
            labels: categoryList.map((category) => category.name),
            datasets: [
              {
                //number of ideas belong to that category
                data: [1, 2, 3],
                backgroundColor: ["red", "blue", "green", "yellow"],
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
}
export default CategoryD;
