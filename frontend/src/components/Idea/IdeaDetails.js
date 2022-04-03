import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../services/useFetch.js";
import Comments from "../Comment/Comments";
import axios from "axios";
import useAxios from "../../services/useAxios";
import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Typography } from "@material-ui/core";
import { ReturnLink } from "./IdeaButtons";
import EditIcon from "@mui/icons-material/Edit";

const COMMENT_URL = "https://33c6-171-232-148-95.ap.ngrok.io/v1.0/comments";
const baseURL = "https://33c6-171-232-148-95.ap.ngrok.io/v1.0";

let viewUpdated = false;
const IdeaDetails = () => {
  const { id } = useParams();

  // const { data: idea, error, isPending } = useFetch("ideas/" + id);
  const { response, loading, error } = useAxios({
    url: "https://33c6-171-232-148-95.ap.ngrok.io/v1.0/ideas" + id,
    method: "get",
  });

  const navigate = useNavigate();
  const [content, setContent] = useState("Please input your idea");
  //   useEffect(() => {
  //     const idea = { content };
  //     axios
  //       .patch(`${baseURL}/ideas/${id}?views=1`, JSON.stringify(idea), {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((r) => {});
  //   }, []);

  console.log(idea);
  // const handleUpdate = async (idea) => {
  //   const response = await axios.put(`/ideas/${idea._id}`, idea);
  //   const { name, content } = response.results;
  //   console.log(response.results);
  //   // setIdea(
  //   //   ideas.map((idea) => {
  //   //     return idea._id === id ? { ...response.results } : contact;
  //   //   })
  //   // );
  // };

  const handleDelete = () => {
    fetch("https://33c6-171-232-148-95.ap.ngrok.io/v1.0/ideas/" + id, {
      method: "DELETE",
    }).then(() => {
      navigate("/idea");
    });
  };

  return (
    <Box
      sx={{
        margin: "5rem 10rem 5rem 10rem",
        p: 3,
        border: 1,
        borderColor: "white",
        boxShadow: 4,
        borderRadius: "25px",
        maxWidth: "100%",
      }}
    >
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {idea && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <ReturnLink />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Typography variant="h4" color="primary">
              {idea.title}
              <IconButton onClick={handleDelete}>
                <ClearIcon />
              </IconButton>
            </Typography>
          </Box>
          <Button
            title="edit"
            variant="text"
            color="secondary"
            fontSize="small"
          >
            <EditIcon />
          </Button>

          <Typography variant="subtitle1">ID: {id}</Typography>
          <Box>
            <Typography variant="h6" color="primary">
              Content:
            </Typography>
            <Typography variant="body1">{idea.content}</Typography>
          </Box>
        </Box>
      )}
      <Divider sx={{ m: 2 }}>Comments</Divider>
      {<Comments commentsUrl={COMMENT_URL} ideaId={id} currentUserId="1" />}
    </Box>
  );
};

export default IdeaDetails;
