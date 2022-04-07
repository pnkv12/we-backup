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

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const Comment = ({ comment, currentUserId }) => {

  const [activeComment, setActiveComment] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [data, setNewComment] = useState({
    content: "",
  });

    const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment._id;
    const navigate = useNavigate();
    const [content, setContent] = useState();


    const deleteComment = async (commentId) => {
    fetch("https://be-enterprise.herokuapp.com/v1.0/comment/" + comment._id, {
      method: "DELETE",
    });
  };

  const canDelete = currentUserId === comment.user_id;
  const canEdit = currentUserId === comment.user_id;

const updateComment = (e) => {
    e.preventDefault();
    axios
      .patch(`https://be-enterprise.herokuapp.com/v1.0/comment/${comment._id}`, data)
      .then((res) => {
        console.log(res.data);
        // window.location.reload(false);
      })
      .catch((err) => console.error(err));
    //   setComments();
      setActiveComment(null);
  };

  return (

          <Box>
            <Box className="comment-image-container">
              <Avatar alt="" src="/static/images/avatar/2.jpg" />
            </Box>
            <Box className="comment-right-part">
              <div className="comment-content">
                <div className="comment-author">{comment._id}</div>
              </div>
              <div className="comment-text">{comment.content}</div>
              
              
              <div className="comment-actions">
              {!isEditing && (
                <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({
                    id: comment._id,
                    type: "editing",
                  })
                }
              >
                Edit
              </div>
              )}
              {isEditing && (
              <form onSubmit={(e) => updateComment(e)}>
                <TextField
                  className="comment-form-textarea"
                  value={content}
                  multiline
                  rows={2}
                  onChange={(e) =>
                    setNewComment({ ...data, content: e.target.value })
                  }
                />
                <Button
                  variant="text"
                  // className="comment-form-button"
                  type="submit"
                >
                  Update
                </Button>
                <Button type="button" variant="text" color="secondary">
                  Cancel
                </Button>
              </form>
              )}
                
                <div
                  className="comment-action"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </div>
              </div>
            </Box>
          </Box>
        
  );
};

export default Comment;
