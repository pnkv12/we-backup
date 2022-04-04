// import data from '../../data/comments.json';
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from 'react';
// export const getComments = async () => {
//   return data.comment;
// };
// const token = window.localStorage.getItem('authToken');
// const baseURL = "https://bffb-14-226-238-211.ap.ngrok.io/v1.0";

// export const useCreateComment = async (text, parentId = null, ideaId,) => {
//   const [newComment, setNewComment] = useState({})
//   const [userId, setUserId] = useState("")

//   useEffect(() => {
//     (async function () {
//       try {
//         const userRes = await axios.get(`${baseURL}/users/me`, {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//           },
//         });
//         setUserId(userRes);
//         setTimeout(async () => {
//           const response = await axios.post(`${baseURL}/comments?ideaId=${ideaId}`, {
//             content: text
//           }, {
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${token}`
//             }
//           })
//           console.log(response.data);
//           setNewComment(response.data);
//         }, 1000)
//       } catch (error) {
//         console.log(error);
//       }
//     })()
//   }, [text, ideaId])

//   return {
//     id: newComment._id,
//     content: text,
//     ideaId: newComment.ideaId,
//     parentId,
//     userId: userId,
//     created_at: new Date(),
//     // username: "John",
//     // closed_date: text
//   };
// };

// // export const getParentId = async () =>{
// //   return{
// //     parentId
// //   };
// // };

// export const updateComment = async (text) => {
//   return { text };
// };

//   // export const deleteComment = async () => {
//   //   fetch('https://bffb-14-226-238-211.ap.ngrok.io/v1.0/comment/' + comment.id, {
//   //     method: 'DELETE'
//   //   }).then(() => {
//   //     navigate.push('/');
//   //   })
//   // };
