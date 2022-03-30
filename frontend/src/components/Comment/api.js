// import data from '../../data/comments.json';
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from 'react';
// export const getComments = async () => {
//   return data.comment;
// };
// const token = window.localStorage.getItem('authToken');
// const baseURL = "http://localhost:8000";

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
//   //   fetch('http://localhost:8000/comment/' + comment.id, {
//   //     method: 'DELETE'
//   //   }).then(() => {
//   //     navigate.push('/');
//   //   })
//   // };