import axios from "axios";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cmtBox } from "../../styles/boxStyles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const uid = window.sessionStorage.getItem("uid");
const baseURL = "https://1d65-14-226-238-211.ap.ngrok.io/v1.0";
const CreateComment = (ideaId) => {
  var date = new Date();
  const [content, setContent] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [user_id, setUserId] = useState(uid);
  const [idea_id, setIdeaId] = useState(ideaId);

//   setUserId(uid);
//   setIdeaId(ideaId);
  const onSubmitComment = (event) => {
    event.preventDefault();

    console.log(user_id);
    console.log(idea_id);
    const comment = { content, user_id, idea_id };

    try {
      axios
        .post(`${baseURL}/comment`, comment, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmitComment}>
      <Box sx={cmtBox}>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            sx={{ width: "95%" }}
            multiline
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Say something..."
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            className="comment-form-button"
            type="submit"
          >
            Post
          </Button>
          <Button
            variant="outlined"
            type="button"
            className="comment-form-button comment-form-cancel-button"
            onClick
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};
export default CreateComment;
