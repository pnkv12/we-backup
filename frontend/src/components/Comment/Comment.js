import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxios from "../../services/useAxios";
import "./styles.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { replyBox } from "../../styles/boxStyles";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const uid = window.sessionStorage.getItem("uid");
const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const Comment = ({ comment, currentUserId }) => {
  const [activeComment, setActiveComment] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [data, setNewComment] = useState({
    content: "",
    user_id: "624914af542d2a0c93923545",
  });

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment._id;
  const navigate = useNavigate();
  const [content, setContent] = useState();

  const deleteComment = async (commentId) => {
    axios.delete(
      "https://e734-171-239-139-225.ap.ngrok.io/v1.0/comment/" + comment._id,
      {
        method: "DELETE",
        body: {
          user_id: "624914af542d2a0c93923545",
        },
      }
    );
  };

  const canDelete = currentUserId === comment.user_id;
  const canEdit = currentUserId === comment.user_id;

  const updateComment = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://e734-171-239-139-225.ap.ngrok.io/v1.0/comment/${comment._id}`,
        data
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
    //   setComments();
    setActiveComment(null);
    window.location.reload(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Avatar alt="" src="/static/images/avatar/2.jpg" />
        <Box sx={{ fontSize: 15, alignSelf: "center" }}>{comment.user_id}</Box>
      </Box>
      <Box sx={replyBox}>
        <Box>
          <Box>
            {!isEditing && (
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ flexGrow: 1, fontSize: 15, alignSelf: "center" }}>
                  {comment.content}
                </Box>
                <Box>
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
                  <IconButton
                    size="small"
                    onClick={() => deleteComment(comment._id)}
                  >
                    <ClearIcon fontSize="inherit" />
                  </IconButton>
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
  );
};

export default Comment;
