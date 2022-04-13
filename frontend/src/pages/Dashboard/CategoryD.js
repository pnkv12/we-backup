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
import Select from "@mui/material/Select";
import { dashboardFlex } from "../../styles/boxStyles";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  // textAlign: "left",
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

// export function CateDD({ categoryList }) {
//   const [category, setCategory] = useState();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(category);
//   };
//   const handleChange = (e) => {
//     setCategory(e.target.value);
//   };

//   return (
//     <FormControl
//       onSubmit={handleSubmit}
//       sx={{ width: "10rem", display: "inline-flex" }}
//     >
//       <InputLabel id="demo-simple-select-label">View By</InputLabel>
//       <Select
//         value={category}
//         id="demo-simple-select"
//         labelId="demo-simple-select-label"
//         label="View By"
//         onChange={handleChange}
//       >
//         {categoryList.map((category) => (
//           <MenuItem key={category._id} value={category.name}>
//             {category.name}
//           </MenuItem>
//         ))}
//       </Select>
//       {/* <Button variant="outlined" type="submit">
//           View
//         </Button> */}
//     </FormControl>
//   );
// }

function CategoryD() {
  // const [ideas, setIdeas] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [categories, setCategories] = useState({});

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
  useEffect(() => {
    (async function () {
      const res = await axios({
        url: `${baseURL}/categories`,
        method: "get",
      });
      setCategories(res.data); // return res.data.length;
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
        <TitleFrame>Statistical Analysis - Category</TitleFrame>
        <Divider
          sx={{
            marginBottom: "2rem",
          }}
        ></Divider>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <CateDD categoryList={categoryList} /> */}
          <Box sx={{ marginLeft: "3rem" }}>
            Total categories: {categories.length}
          </Box>
        </Box>
        {/* Dynamic detail panel */}
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
        {/* <p>Total ideas: {ideas.length} </p> */}
        <PieChart
          data={{
            labels: categoryList.map((category) => category.name),
            datasets: [
              {
                //number of ideas belong to that category
                data: [1, 1, 1, 1, 1],
                backgroundColor: ["red", "blue", "green", "yellow", "purple"],
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
}
export default CategoryD;
