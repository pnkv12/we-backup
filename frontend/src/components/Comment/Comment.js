import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  createComment,
  parentId,
  currentUserId,
}) => {
  const canDelete = currentUserId === comment.userId && replies.length === 0;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment._id;
  const replyId = parentId ? parentId : comment._id;
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const deleteComment = async () => {
    fetch(
      "https://33c6-171-232-148-95.ap.ngrok.io/v1.0/comments/" + comment._id,
      {
        method: "DELETE",
      }
    );
  };

  return (
    <div key={comment.id} className="comment">
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
            <textarea
              className="comment-form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="comment-form-button">Update</button>
            <button
              type="button"
              className="comment-form-button comment-form-cancel-button"
            >
              Cancel
            </button>
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
    </div>
  );
};

export default Comment;
