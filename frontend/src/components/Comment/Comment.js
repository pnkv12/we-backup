// import CommentForm from "./CommentForm";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import useAxios from "../../services/useAxios";
// import "./styles.css";
// import Avatar from "@mui/material/Avatar";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import { Box, Divider } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { replyBox } from "../../styles/boxStyles";

// const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
// const Comment = ({ currentUserId }) => {
//   const { id } = useParams();
//   const [comment, setComment] = useState();
//   // const [isPending, setIsPending] = useState(true);
//   // const [error, setError] = useState(null);

const isEditing =
  activeComment &&
  activeComment.type === "editing" &&
  activeComment.id === comment._id;
const navigate = useNavigate();
const [content, setContent] = useState();
const deleteComment = async () => {
  fetch("https://be-enterprise.herokuapp.com/v1.0/comments/" + comment._id, {
    method: "DELETE",
  });
};

//   const navigate = useNavigate();
//   const [content, setContent] = useState();

//   useEffect(() => {
//     if (response != null) {
//       console.log(response);
//       setComment(response);
//     }
//   }, [response]);

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     fetch("https://be-enterprise.herokuapp.com/v1.0/comment/" + id)
//   //       .then((res) => {
//   //         if (!res.ok) {
//   //           throw Error("could not fetch");
//   //         }
//   //         return res;
//   //         console.log(res);
//   //       })
//   //       .then((comment) => {
//   //         setComment(comment);
//   //         setIsPending(false);
//   //         setError(null);
//   //       })
//   //       .catch((err) => {
//   //         if (err.name === "AbortError") {
//   //           console.log("fetch aborted");
//   //         } else {
//   //           setIsPending(false);
//   //           setError(err.message);
//   //         }
//   //       });
//   //   }, 1000);
//   // }, []);

//   // const canDelete = currentUserId === comment.user_id;
//   // const canEdit = currentUserId === comment.user_id;
//   // const isEditing =
//   //   activeComment &&
//   //   activeComment.type === "editing" &&
//   //   activeComment.id === comment._id;

//   const deleteComment = async () => {
//     fetch(
//       "https://be-enterprise.herokuapp.com/v1.0/comments/" + comment._id,
//       {
//         method: "DELETE",
//       }
//     );
//   };
//   const updateComment = () => {};

//   return (
// <Box>
//   <div className="comment-image-container">
//     <Avatar alt="" src="/static/images/avatar/2.jpg" />
//   </div>
//   <div className="comment-right-part">
//     <div className="comment-content">
//       <div className="comment-author">{id}</div>
//     </div>
//     <div className="comment-text">content</div>
//     <form>
//       <TextField
//         className="comment-form-textarea"
//         value={content}
//         multiline
//         rows={2}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <Button
//         variant="text"
//         // className="comment-form-button"
//         type="submit"
//       >
//         Update
//       </Button>
//       <Button type="button" variant="text" color="secondary">
//         Cancel
//       </Button>
//     </form>

//     <div className="comment-actions">
//       <div
//         className="comment-action"
//         onClick={() =>
//           setActiveComment({ id: comment.id, type: "editing" })
//         }
//       >
//         Edit
//       </div>
//       <div
//         className="comment-action"
//         onClick={() => deleteComment(comment.id)}
//       >
//         Delete
//       </div>
//     </div>
//   </div>
// </Box>
//   );
// };

// export default Comment;
