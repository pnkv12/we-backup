// import axios from "axios";
// import { useEffect, useState } from "react";
// import Comments from "./Comments";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { cmtBox } from "../../styles/boxStyles";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

const baseURL = "https://1d65-14-226-238-211.ap.ngrok.io/v1.0";

// const CommentForm = ({
//   ideaId,
//   handleSubmit,
//   submitLabel,
//   hasCancelButton = false,
//   initialText = "",
//   handleCancel,
// }) => {
//   var date = new Date();
//   // var parId = Comment.parentId;
//   const [content, setContent] = useState(initialText);
//   // const [ideaId, setIdeaId] = useState();
//   // const [username, setUsername] = useState('');
//   const [owner, setOwner] = useState("");
//   const [parentId, setParentId] = useState(null);
//   const [createdAt, setCreateDate] = useState(date);
//   const [closedDate, setCloseDate] = useState();
//   const [isPending, setIsPending] = useState(false);
//   const [userId, setUserId] = useState("");

//   const isTextareaDisable = content.length === 0;

//   const token = window.localStorage.getItem("authToken");

//   useEffect(() => {
//     (async function () {
//       const userRes = await axios.get(`${baseURL}/users/me`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       setUserId(userRes.data);
//     })();
//   }, [token]);

//   const onSubmit = (event) => {
//     event.preventDefault();
//     // const comment = { content, ideaId, parentId, owner, closedDate };
//     setIsPending(true);
//     // fetch("https://1d65-14-226-238-211.ap.ngrok.io/v1.0/comments", {
//     //   method: "POST",
//     //   headers: { Authorization: `Bearer ${token}` },
//     //   body: JSON.stringify(comment),
//     // }).then(() => {
//     setParentId(null);

// setUsername();
// setCloseDate(   );
// handleSubmit(content, parentId);
// setIsPending(false);
// });

//     try {
//       axios
//         .post(
//           `${baseURL}/comments?ideaId=${ideaId}`,
//           {
//             content: content,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then((res) => console.log(res.data));

//       handleSubmit(content, parentId);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // useEffect(() => {
//   //   (async function () {
//   //     try {
//   //       const userRes = await axios.get(`${baseURL}/users/me`, {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           "Authorization": `Bearer ${token}`
//   //         },
//   //       });

//   //       setUserId(userRes.data);
//   //       setTimeout(async () => {
//   //         const response = await axios.post(`${baseURL}/comments?ideaId=${ideaId}`, {
//   //           content: text
//   //         }, {
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //             "Authorization": `Bearer ${token}`
//   //           }
//   //         })
//   //         console.log(response.data);
//   //         handleSubmit(text, parentId);
//   //       }, 1000)
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   })()
//   // }, [handleSubmit, ideaId, parentId, text, token])

//   return (
//     <form onSubmit={onSubmit}>
//       <Box sx={cmtBox}>
//         <Box sx={{ flexGrow: 1 }}>
//           <TextField
//             sx={{ width: "95%" }}
//             multiline
//             rows={2}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Say something..."
//           />
//         </Box>
//         <Box>
//           <Button
//             variant="contained"
//             className="comment-form-button"
//             disabled={isTextareaDisable}
//             type="submit"
//           >
//             {submitLabel} Post
//           </Button>
//           {hasCancelButton && (
//             <Button
//               variant="outlined"
//               type="button"
//               className="comment-form-button comment-form-cancel-button"
//               onClick={handleCancel}
//             >
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Box>
//     </form>
//   );
// };

// export default CommentForm;
