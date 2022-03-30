import axios from "axios";
import { useEffect, useState } from "react";
import Comments from './Comments';

const baseURL = "http://localhost:8000";

const CommentForm = ({
  ideaId,
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "", handleCancel
}) => {
  var date = new Date();
  // var parId = Comment.parentId;
  const [content, setContent] = useState(initialText);
  // const [ideaId, setIdeaId] = useState();
  // const [username, setUsername] = useState('');
  const [owner, setOwner] = useState("");
  const [parentId, setParentId] = useState(null);
  const [createdAt, setCreateDate] = useState(date);
  const [closedDate, setCloseDate] = useState();
  const [isPending, setIsPending] = useState(false);
  const [userId, setUserId] = useState('')

  const isTextareaDisable = content.length === 0;

  const token = window.localStorage.getItem('authToken');

  useEffect(() => {
    (async function () {
      const userRes = await axios.get(`${baseURL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      setUserId(userRes.data);
    })()
  }, [token])


  const onSubmit = event => {
    event.preventDefault();
    // const comment = { content, ideaId, parentId, owner, closedDate };
    setIsPending(true);
    // fetch("http://localhost:8000/comments", {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${token}` },
    //   body: JSON.stringify(comment),
    // }).then(() => {
    setParentId(null);

    // setUsername();
    // setCloseDate(   );
    // handleSubmit(content, parentId);
    setIsPending(false);
    // });

    try {
      axios.post(`${baseURL}/comments?ideaId=${ideaId}`, {
        content: content
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(
        (res) => console.log(res.data)
      )

      handleSubmit(content, parentId);
    } catch (error) {
      console.log(error);
    }

  }

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const userRes = await axios.get(`${baseURL}/users/me`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`
  //         },
  //       });

  //       setUserId(userRes.data);
  //       setTimeout(async () => {
  //         const response = await axios.post(`${baseURL}/comments?ideaId=${ideaId}`, {
  //           content: text
  //         }, {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Authorization": `Bearer ${token}`
  //           }
  //         })
  //         console.log(response.data);
  //         handleSubmit(text, parentId);
  //       }, 1000)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })()
  // }, [handleSubmit, ideaId, parentId, text, token])

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)} />
      <button className="comment-form-button" disabled={isTextareaDisable}>{submitLabel}</button>
      {hasCancelButton && (
        <button type="button" className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>Cancel</button>
      )}
    </form>
  );
}

export default CommentForm;