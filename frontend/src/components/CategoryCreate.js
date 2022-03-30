import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { lightBlue } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
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
  // textAlign: "center",
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const CategoryCreate = () => {
  var date = new Date();

  const [categoryName, setCategoryName] = useState("Unknown category");
  const [created_at, setCreateDate] = useState(date);
  const [updated_at, setUpdateDate] = useState();
  const [isPending, setIsPending] = useState(false);

  //H thêm
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => console.error(err));
  });

  const url = "http://localhost:8000/categories";
  const [CategoryList, setCategory] = useState([]);
  const display = CategoryList.map((item) => (
    <tr key={item._id}>
      <td>{item.categoryName}</td>
      <td>{item.used}</td>
      {/* <td>{item.created_at}</td>
      <td>{item.updated_at}</td> */}
      <td>
        <Button variant="text" color="error" onClick={() => remove(item._id)}>
          <HighlightOffIcon />
        </Button>
      </td>
    </tr>
  ));

  function remove(id) {
    // console.log(id);
    axios
      .delete(url + "/" + id)
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
      categoryName,
      created_at,
      updated_at,
    };

    setIsPending(true);

    try {
      const response = await axios.post(url, JSON.stringify(category), {
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
  };

  return (
    <Box>
      <Box
        sx={{
          border: 1,
          borderColor: "white",
          boxShadow: 4,
          borderRadius: "25px",
          margin: "2rem 3rem",
          padding: "2rem",
          maxWidth: "100%",
        }}
      >
        <TitleFrame>Create Category</TitleFrame>
        <Divider
          sx={{
            marginBottom: "1.5rem",
          }}
        />

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="outlined-basic"
              type="text"
              label="New Category"
              variant="outlined"
              name="tag"
              placeholder={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              size="small"
              sx={{
                width: "50%",
                alignSelf: "center",
              }}
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                sx={{ marginLeft: "1rem", marginRight: "1rem" }}
              >
                Create
              </Button>

              <Button
                component={RouterLink}
                to="/"
                variant="contained"
                color="secondary"
                sx={{ margin: "1rem 0rem" }}
              >
                Cancel
              </Button>
            </Box>
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
          maxWidth: "100%",
        }}
      >
        <TitleFrame>Category/Tags List</TitleFrame>
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
