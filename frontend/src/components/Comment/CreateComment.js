import axios from "axios";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cmtBox } from "../../styles/boxStyles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const uid = window.sessionStorage.getItem("uid");
const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const CreateComment = (ideaId) => {
  var date = new Date();
  const [content, setContent] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [user_id, setUserId] = useState(uid);
  const [idea_id, setIdeaId] = useState(ideaId.ideaId);

  //   setUserId(uid);
  //   setIdeaId(ideaId);
  const onSubmitComment = (event) => {
    event.preventDefault();

    console.log(user_id);
    console.log(idea_id);
    // console.log(userId);
    const comment = { content, idea_id, user_id: "624914af542d2a0c93923545" };

    console.log(comment);

    try {
      axios
        .post(`https://be-enterprise.herokuapp.com/v1.0/comment`, comment, {
          validateStatus: (status) => {
            return true;
          },
        })
        .then((res) => console.log("data" + res.data));
      // window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={onSubmitComment}>
      <Box sx={cmtBox}>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            id="comment-box"
            sx={{ width: "100%" }}
            multiline
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Say something..."
          />
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <Button variant="text" text="primary" type="submit">
            <SendIcon />
          </Button>
          {/* <IconButton
            text="primary"
            type="button"
            onClick={() => setContent(() => "")}
          >
            <ClearIcon />
          </IconButton> */}
        </Box>
      </Box>
    </form>
  );
};
export default CreateComment;
