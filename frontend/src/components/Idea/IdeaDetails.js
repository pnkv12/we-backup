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
import TextField from "@mui/material/TextField";

const COMMENT_URL = "https://1d65-14-226-238-211.ap.ngrok.io/v1.0/comments";
const baseURL = "https://1d65-14-226-238-211.ap.ngrok.io/v1.0";

const uid = window.sessionStorage.getItem("uid");

let viewUpdated = false;
const IdeaDetails = () => {
  const { id } = useParams();

  // const { data: idea, error, isPending } = useFetch("ideas/" + id);
  const [idea, setIdea] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [data, setNewIdea] = useState({
    content: "",
  });
  const isEditing =
    activeUpdate &&
    activeUpdate.type === "editing" &&
    activeUpdate.id === idea.id;
  useEffect(() => {
    setTimeout(() => {
      fetch("https://1d65-14-226-238-211.ap.ngrok.io/v1.0/idea/" + id)
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch");
          }
          return res.json();
        })
        .then((idea) => {
          setIdea(idea);
          setIsPending(false);
          setError(null);
          console.log(idea);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);
  }, []);

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

  useEffect(() => {
    axios
      .get("https://1d65-14-226-238-211.ap.ngrok.io/v1.0/idea/" + id)
      .then((res) => {
        // console.log(res.data.results.content);
        setNewIdea(res.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  function submit(e) {
    e.preventDefault();
    axios
      .patch(`https://1d65-14-226-238-211.ap.ngrok.io/v1.0/idea/${id}`, data)
      .then((res) => {
        console.log(res.data);
        navigate("/ideas/" + id);
        window.location.reload(false);
      })
      .catch((err) => console.error(err));
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setNewIdea(newdata);
  }

  const handleDelete = () => {
    fetch("https://1d65-14-226-238-211.ap.ngrok.io/v1.0/idea/" + id, {
      method: "DELETE",
    }).then(() => {
      navigate("/ideas");
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
              <Button
                title="edit"
                variant="text"
                color="secondary"
                fontSize="small"
                onClick={() =>
                  setActiveUpdate({ id: idea.id, type: "editing" })
                }
              >
                <EditIcon />
              </Button>
            </Typography>
          </Box>

          <Typography variant="subtitle1">ID: {id}</Typography>
          <Box>
            {!isEditing && (
              <p>
                <Typography variant="h6" color="primary">
                  Content:
                </Typography>
                <Typography variant="body1">{idea.content}</Typography>
              </p>
            )}

            {isEditing && (
              <form onSubmit={(e) => submit(e)}>
                <TextField
                  placeholder={idea.content}
                  multiline
                  rows={4}
                  onChange={(e) =>
                    setNewIdea({ ...data, content: e.target.value })
                  }
                />
                <Button variant="contained" type="submit">
                  Post
                </Button>
              </form>
            )}
          </Box>
        </Box>
      )}
      <Divider sx={{ m: 2 }}>Comments</Divider>
      {<Comments ideaId={id} />}
    </Box>
  );
};

export default IdeaDetails;
