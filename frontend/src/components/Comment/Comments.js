import { useState, useEffect } from "react";
import {
  getComments as getCommentsApi,
  useCreateComment,
  updateComment as updateCommentApi,
} from "./api";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import data from "../../data/comments.json";
import useFetch from "./useFetch";
import PageNotFound from "../../components/errorHandling/PageNotFound";
import LoadingIndicator from "../../components/Loading";
import useAxios from "../../services/useAxios";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./styles.css";
import axios from "axios";

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const uid = window.sessionStorage.getItem("uid");

const Comments = ({ commentsUrl, ideaId, currentUserId }) => {
  // const {data: comments, isPending, error} = useFetch('http://localhost:8081/comment');
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState();
  const [activeComment, setActiveComment] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${baseURL}/comments`);

        console.log("comments of this idea:", response.data);
        if (response != null) {
          const commentList = response.data.map((comment) => {
            return {
              commentId: comment.comment_id,
              content: comment.content,
            };
          });

          setComments(response.data);
        }
      } catch (e) {
        throw e;
      }
    })();
  }, []);

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedComments = comments.map((Comment) => {
        if (Comment._id === commentId) {
          return { ...Comment, body: text };
        }
        return Comment;
      });
      setComments(updatedComments);
      setActiveComment(null);
    });
  };

  const deleteComment = async () => {
    fetch("https://be-enterprise.herokuapp.com/v1.0/comment/" + Comment._id, {
      method: "DELETE",
    });
  };

  return (
    <Box>
      <Typography variant="h6">Write comment</Typography>
      <CreateComment ideaId={ideaId} />
      <Divider />
      <Box>
        {/* <div>list comment here</div> */}
        {comments.map((comment) => (
          <Box>
            <Box className="comment-image-container">
              <Avatar alt="" src="/static/images/avatar/2.jpg" />
            </Box>
            <Box className="comment-right-part">
              <div className="comment-content">
                <div className="comment-author">{comment.comment_id}</div>
              </div>
              <div className="comment-text">{comment.content}</div>
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

              <div className="comment-actions">
                <div
                  className="comment-action"
                  onClick={() =>
                    setActiveComment({
                      id: comment.comment_id,
                      type: "editing",
                    })
                  }
                >
                  Edit
                </div>
                <div
                  className="comment-action"
                  onClick={() => deleteComment(comment.comment_id)}
                >
                  Delete
                </div>
              </div>
            </Box>
          </Box>
        ))}
      </Box>
      <br />
    </Box>
  );
};

export default Comments;
