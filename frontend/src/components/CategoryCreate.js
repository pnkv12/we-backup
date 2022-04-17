import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { lightBlue } from "@mui/material/colors";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// import Category from "./Category/Category";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 25,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const CategoryCreate = () => {
  var date = new Date();

  const [name, setCategoryName] = useState("Unknown category");
  const [ideas, setIdeas] = useState();
  const [created_at, setCreateDate] = useState(date);
  const [updated_at, setUpdateDate] = useState();
  const [isPending, setIsPending] = useState(false);

  const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
  const cateListUrl = `${baseURL}/categories`;
  const getCateURL = `${baseURL}/category`;

  const [CategoryList, setCategory] = useState([]);

  useEffect(() => {
    (async function () {
      const cate = await axios({
        url: `${cateListUrl}`,
        method: "get",
      });
      setCategory(cate.data);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const ideas = await axios({
        url: `${baseURL}/ideas`,
        method: "get",
      });
      setIdeas(ideas.data.results);
    })();
  }, []);
  
 
  const display = CategoryList.map((item) => (
    <Box>
      <tr key={item._id}>
        <td>
          <IconButton
            // variant="text"
            color="error"
            onClick={() => remove(item._id)}
          >
            <HighlightOffIcon />
          </IconButton>
        </td>
        <td>{item.name}</td>
      </tr>
    </Box>
  ));

  function remove(id) {
    // console.log(id);
    axios
      .delete(getCateURL + "/" + id)
      .then((res) => {
        console.log(res.data);
        const myalldata = CategoryList.filter((item) => item._id !== id);
        setCategory(myalldata);
      })
      .catch((err) => console.error(err));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = {
      name,
      created_at,
      updated_at,
    };

    setIsPending(true);

    try {
      const response = await axios.post(getCateURL, JSON.stringify(category), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      console.log("New category added");
      setIsPending(false);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
    window.location.reload(false);
  };
  

  return (
    <Box>
      <Box
        sx={{
          margin: "2rem 3rem",
          padding: "2rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <TextField
              id="outlined-basic"
              type="text"
              label="New Category"
              variant="outlined"
              name="name"
              onChange={(e) => setCategoryName(e.target.value)}
              size="small"
              sx={{
                width: "20rem",
                alignSelf: "center",
              }}
            />
            <Button type="submit" variant="text" sx={{ marginLeft: "1rem" }}>
              <AddIcon />
            </Button>
          </Box>
        </form>
      </Box>
      <Box
        sx={{
          border: 1,
          borderColor: "white",
          boxShadow: 4,
          borderRadius: "25px",
          margin: "2rem 3rem",
          padding: "2rem",
        }}
      >
        <TitleFrame>Category List</TitleFrame>
        <TableContainer sx={{ width: "60%", marginLeft: "3rem" }}>
          <Table aria-label="simple table">
            <TableBody>{display}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CategoryCreate;
