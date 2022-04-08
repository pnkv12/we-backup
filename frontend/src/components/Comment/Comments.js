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
import { useNavigate, useParams } from "react-router-dom";

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const uid = window.sessionStorage.getItem("uid");

const Comments = ({ commentsUrl, ideaId, currentUserId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${baseURL}/comments`);

        console.log("comments of this idea:", response.data);
        if (response != null) {
          const commentList = response.data.map((comment, id) => {
            return {
              id: id + 1,
              commentId: comment._id,
              content: comment.content,
            };
          });
          console.log(response.data);
          setComments(response.data);
        }
      } catch (e) {
        throw e;
      }
    })();
  }, []);

  // const updateComment = (params) => {
  //   axios
  //     .patch(`https://be-enterprise.herokuapp.com/v1.0/comment/${params.commentId}`, data)
  //     .then((res) => {
  //       console.log(res.data);
  //       navigate("/idea/" + ideaId);
  //       window.location.reload(false);
  //     })
  //     .catch((err) => console.error(err));
  //     // setComments();
  //     setActiveCommentUpdate(null);
  // };

  // const deleteComment = async (commentId) => {
  //   fetch("https://be-enterprise.herokuapp.com/v1.0/comment/" + commentId, {
  //     method: "DELETE",
  //   });
  // };

  // const handleDelete = () => {
  //   fetch("https://be-enterprise.herokuapp.com/v1.0/idea/" + id, {
  //     method: "DELETE",
  //   }).then(() => {
  //     navigate("/ideas");
  //   });
  // };

  return (
    <Box>
      <CreateComment ideaId={ideaId} />
      <Box>
        {/* <div>list comment here</div> */}
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} currentUserId={uid} />
        ))}
      </Box>
      <br />
    </Box>
  );
};

export default Comments;
