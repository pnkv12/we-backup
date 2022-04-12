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
import { Tooltip } from "@mui/material";

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
  const [owner, setOwner] = useState(null);
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
            throw Error("Idea has been deleted");
          }
          return res.json();
        })
        .then((idea) => {
          console.log(idea.idea);

          setIdea(idea.idea);
          setOwner(idea.owner);
          setIsPending(false);
          setError(null);
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
        {idea && (
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Download document as Zip">
              <IconButton
                color="default"
                aria-label="document"
                component="span"
                onClick={async () => {
                  await downloadZip(id);
                }}
              >
                <CloudDownloadIcon />
              </IconButton>
            </Tooltip>

            {getRole === "Manager" ? (
              <Box>
                <IconButton
                  title="edit"
                  color="primary"
                  size="small"
                  onClick={() =>
                    setActiveUpdate({ id: idea.id, type: "editing" })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={handleDelete} size="small">
                  <ClearIcon />
                </IconButton>
              </Box>
            ) : idea.user_id !== uid ? null : (
              <Box>
                <IconButton
                  title="edit"
                  color="primary"
                  size="small"
                  onClick={() =>
                    setActiveUpdate({ id: idea.id, type: "editing" })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={handleDelete} size="small">
                  <ClearIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {idea && owner && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Typography variant="h5" color="primary">
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
              {idea.anonymousMode === false
                ? "Author: " + owner.fullname
                : "Anonymous"}
            </Typography>
          </Box>
          <Box>
            {!isEditing && (
              <Box sx={{ m: "3rem" }}>
                <Box
                  sx={{
                    fontStyle: "oblique",
                    fontSize: 14,
                    m: "2rem",
                    fontFamily: "Monospace",
                  }}
                >
                  {idea.description}
                </Box>
                <Box sx={{ m: "2rem", fontSize: 18, whiteSpace: "pre-line" }}>
                  {idea.content}
                </Box>
              </Box>
            )}

            {isEditing && (
              <form onSubmit={(e) => submit(e)}>
                <Box>
                  <Box sx={{ m: 2 }}>
                    <TextField
                      type="text"
                      defaultValue={idea.title}
                      onChange={(e) =>
                        setNewIdea({ ...data, title: e.target.value })
                      }
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ m: 2 }}>
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
                  </Box>
                  <Box sx={{ m: 2 }}>
                    <TextField
                      type="text"
                      defaultValue={idea.content}
                      multiline
                      rows={15}
                      onChange={(e) =>
                        setNewIdea({ ...data, content: e.target.value })
                      }
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button
                      variant="outlined"
                      type="submit"
                      startIcon={<SendIcon />}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setActiveUpdate(() => isEditing)}
                      startIcon={<ClearIcon />}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
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
