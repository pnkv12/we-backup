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

import "./styles.css";
import axios from "axios";

const baseURL = "https://1d65-14-226-238-211.ap.ngrok.io/v1.0";

const Comments = ({ commentsUrl, ideaId, currentUserId }) => {
  // const {data: comments, isPending, error} = useFetch('http://localhost:8081/comment');
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [rootComments, setRootComments] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${baseURL}/comments?ideaId=${ideaId}`
        );

        console.log("comments of this idea:", response.data);
        if (response != null) {
          setRootComments(response.data);
        }
      } catch (e) {
        throw e;
      } finally {
        return <LoadingIndicator />;
      }
    })();
  }, [ideaId]);

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

  return (
    <Box>
      <Typography variant="h6">Write comment</Typography>
      <CreateComment ideaId={ideaId} />
      <Divider />
      <Box>
        {rootComments.map((rootComment) => (
          <Comment currentUserId={currentUserId} />
        ))}
      </Box>
      <br />
    </Box>
  );
};

export default Comments;
