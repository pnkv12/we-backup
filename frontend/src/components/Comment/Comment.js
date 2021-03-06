import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxios from "../../services/useAxios";
import "./styles.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { replyBox } from "../../styles/boxStyles";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const uid = window.sessionStorage.getItem("uid");
const fullname = window.sessionStorage.getItem("fullname");
const getRole = window.sessionStorage.getItem("roleName");

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const Comment = ({ comment, currentUserId, commentIdeaId }) => {
  const [activeComment, setActiveComment] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [data, setNewComment] = useState({
    content: "",
    user_id: currentUserId,
  });
  // console.log(currentUserId);
  const [users, setUsers] = useState({});

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment._id;
  const navigate = useNavigate();
  const [content, setContent] = useState();

  const deleteComment = (commentId) => {
    (async function (commentId) {
      await axios.delete(`${baseURL}/comment/` + comment._id, {
        data: { user_id: currentUserId },
      });
      window.location.reload(false);
    })();
  };

  const canDelete = currentUserId === comment.user_id;
  const canEdit = currentUserId === comment.user_id;
  const isCommentOfIdea = commentIdeaId === comment.idea_id;

  const updateComment = (e) => {
    e.preventDefault();
    (async function () {
      const postCmt = await axios
        .patch(`${baseURL}/comment/${comment._id}`, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error(err));
      setActiveComment(null);
      window.location.reload(false);
    })();
  };

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
    <div>
      {users && isCommentOfIdea && (
        <Box>
          <Box sx={{ display: "flex" }}>
            <Avatar alt="" src="/static/images/avatar/2.jpg" />
            {uid === comment.user_id ? (
              <Box sx={{ fontSize: 15, alignSelf: "center" }}> {fullname}</Box>
            ) : (
              <Box sx={{ fontSize: 15, alignSelf: "center" }}> Anon</Box>
            )}
          </Box>
          <Box sx={replyBox}>
            <Box>
              <Box>
                {!isEditing && (
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Box
                      sx={{ flexGrow: 1, fontSize: 15, alignSelf: "center" }}
                    >
                      {comment.content}
                    </Box>
                    <Box>
                      {canEdit && (
                        <IconButton
                          size="small"
                          onClick={() =>
                            setActiveComment({
                              id: comment._id,
                              type: "editing",
                            })
                          }
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                      )}

                      {canDelete || getRole === "Manager" ? (
                        <IconButton
                          size="small"
                          onClick={() => deleteComment(comment._id)}
                        >
                          <ClearIcon fontSize="inherit" />
                        </IconButton>
                      ) : null}
                    </Box>
                  </Box>
                )}
                {isEditing && (
                  <form onSubmit={(e) => updateComment(e)}>
                    <TextField
                      defaultValue={comment.content}
                      fullWidth
                      multiline
                      rows={2}
                      onChange={(e) =>
                        setNewComment({ ...data, content: e.target.value })
                      }
                    />
                    <IconButton type="submit" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      type="button"
                      onClick={() => setActiveComment(isEditing)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </form>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Comment;
