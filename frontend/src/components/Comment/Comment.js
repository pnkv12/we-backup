import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { replyBox } from "../../styles/boxStyles";

const Comment = ({
  comment,
  setActiveComment,
  activeComment,
  updateComment,
  createComment,
  parentId,
  currentUserId,
}) => {
  const canDelete = currentUserId === comment.userId;
  const canEdit = currentUserId === comment.userId;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment._id;
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const deleteComment = async () => {
    fetch(
      "http://localhost:8000/v1.0/comments/" + comment._id,
      {
        method: "DELETE",
      }
    );
  };

  return (
    <Box key={comment.id} sx={replyBox}>
      <div className="comment-image-container">
        <Avatar alt="" src="/static/images/avatar/2.jpg" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment._id}</div>
          <div>{comment.createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.content}</div>}
        {isEditing && (
          <form>
            <TextField
              className="comment-form-textarea"
              value={content}
              multiline
              rows={2}
              onChange={(e) => setContent(e.target.value)}
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
        <div className="comment-actions">
          <div
            className="comment-action"
            onClick={() =>
              setActiveComment({ id: comment._id, type: "editing" })
            }
          >
            Edit
          </div>
          <div
            className="comment-action"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Comment;
