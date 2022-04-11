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
import SendIcon from "@mui/icons-material/Send";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const COMMENT_URL = "https://be-enterprise.herokuapp.com/v1.0/comments";
const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

const uid = window.sessionStorage.getItem("uid");
const getRole = window.sessionStorage.getItem("roleName");
console.log(getRole);
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
      fetch(`${baseURL}/idea/` + id)
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
          if (err.name === "Abort Error") {
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
      .get(`${baseURL}/idea/` + id)
      .then((res) => {
        setNewIdea(res.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  function submit(e) {
    e.preventDefault();
    axios
      .patch(`${baseURL}/idea/${id}`, data)
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
    fetch(`${baseURL}/idea/` + id, {
      method: "DELETE",
    }).then(() => {
      navigate("/ideas");
    });
  };

  useEffect(() => {
    axios
      .post(`${baseURL}/view`, { user_id: uid, idea_id: id })
      .then((r) => {});
  }, []);

  const downloadZip = async (ideaId) => {
    window.location.replace(`${baseURL}/zip/download/${ideaId}`);
    await axios.get(`${baseURL}/zip/download/${ideaId}`);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/idea/` + id)
      .then((res) => {
        setNewIdea(res.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  const [users, setUsers] = useState({});

  const { response } = useAxios({
    url: "users",
    method: "get",
  });
  useEffect(() => {
    if (response != null) {
      const userList = response.map((user) => {
        return {
          userId: user._id,
          username: user.username,
          fullname: user.fullname,
        };
      });
      setUsers(userList);
    }
  }, [response]);

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
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>
          <ReturnLink />
        </Box>
        {idea && users && (
          <Box>
            {/* If current user is a Staff and the idea is theirs. Then they can manage it, else they can't */}
            {/* {idea.user_id === uid && getRole === "Staff" ? (
              <Box>
                <IconButton
                  title="edit"
                  color="secondary"
                  size="small"
                  onClick={() =>
                    setActiveUpdate({ id: idea.id, type: "editing" })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={handleDelete}
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            ) : null} */}

            {/* Other roles can manage ideas regardless of uid */}
            {getRole === "Administrator" ||
            getRole === "Manager" ||
            getRole === "Coordinator" ? (
              <Box>
                <IconButton
                  title="edit"
                  color="secondary"
                  size="small"
                  onClick={() =>
                    setActiveUpdate({ id: idea.id, type: "editing" })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={handleDelete}
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            ) : idea.user_id !== uid && getRole === "Staff" ? null : (
              <Box>
                <IconButton
                  title="edit"
                  color="secondary"
                  size="small"
                  onClick={() =>
                    setActiveUpdate({ id: idea.id, type: "editing" })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={handleDelete}
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      </Box>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {idea && users && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Typography variant="h4" color="primary">
              {idea.title}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              fontStyle: "italic",
            }}
          >
            <Typography variant="h6">
              {idea.anonymousMode === false && idea.user_id === users.userId
                ? users.fullname
                : "Anonymous"}
            </Typography>
          </Box>
          <Box>
            {!isEditing && (
              <p>
                <Typography
                  variant="subtitle1"
                  sx={{ fontStyle: "italic", fontWeight: "bold" }}
                >
                  {idea.description}
                </Typography>

                <Typography variant="body1">{idea.content}</Typography>
              </p>
            )}

            {isEditing && (
              <form onSubmit={(e) => submit(e)}>
                <TextField
                  type="text"
                  defaultValue={idea.title}
                  onChange={(e) =>
                    setNewIdea({ ...data, title: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  type="text"
                  defaultValue={idea.description}
                  multiline
                  rows={1}
                  onChange={(e) =>
                    setNewIdea({ ...data, description: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  type="text"
                  defaultValue={idea.content}
                  multiline
                  rows={4}
                  onChange={(e) =>
                    setNewIdea({ ...data, content: e.target.value })
                  }
                  fullWidth
                />
                <Button variant="text" type="submit">
                  <SendIcon />
                </Button>
                <Button
                  variant="text"
                  text="secondary"
                  onClick={() => setActiveUpdate(() => isEditing)}
                >
                  <ClearIcon />
                </Button>
              </form>
            )}
          </Box>
        </Box>
      )}
      <Divider sx={{ m: 2 }}>Comments</Divider>
      {<Comments commentsUrl={COMMENT_URL} ideaId={id} currentUserId={uid} />}
    </Box>
  );
};

export default IdeaDetails;
