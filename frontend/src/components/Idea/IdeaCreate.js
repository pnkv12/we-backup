import styled from "@emotion/styled";
import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Select from "react-select";
import { InputLabel } from "@mui/material";
import makeAnimated from "react-select/animated";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { lightBlue, grey } from "@mui/material/colors";
import { Typography } from "@material-ui/core";
import Switch from "@mui/material/Switch";
import axios from "axios";

import useAxios from "../../services/useAxios";

// Mới tạo IdeaButtons.js trong Idea(components), chứa 3 function một cái là dạng link Back, cái thứ 2 là nút Cancel, 3 là nút Create Idea
import { ReturnLink, CancelBtn } from "./IdeaButtons";

const Input = styled("input")({
  display: "none",
});

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 25,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const LabelStyle = styled("label")({
  fontStyle: "oblique",
  color: grey[500],
  fontSize: 13,
  display: "flex",
  p: 1,
  m: 1,
  justifyContent: "space-between",
});

// const getAllCategories = async () => {
//     const response = await axios.get(`https://be-enterprise.herokuapp.com/v1.0/categories`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         }
//     );
//     console.log(response);
// };
const IdeaCreate = () => {
  const uid = window.sessionStorage.getItem("uid");
  const fullname = window.sessionStorage.getItem("fullname");

  var date = new Date();
  const [idea, setIdea] = useState(null);
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState(null);
  const [content, setContent] = useState("Please input your idea");
  const [anonymousMode, setAnonymous] = useState(false);
  const [anon, setAnon] = useState(anonymousMode);
  const [displayUser, setDisplay] = useState(fullname);
  const [user_id, setUserId] = useState(uid);
  const [submission_id, setSubmissionId] = useState("624fa5fe94814c446e5a6911");
  const [documents, setSelectedFile] = useState([]);
  const [document, setDocument] = useState("");
  const [documentURL, setDocumentURL] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [createdAt, setCreateDate] = useState(date);
  const [updatedAt, setUpdateDate] = useState(date);
  const [closedDate, setCloseDate] = useState();
  const [category, setSelectedTag] = useState([]);
  const [categories, setCategories] = useState([]);
  const [__v, setV] = useState();
  const [isPending, setIsPending] = useState(false);
  const [isBusy, setBusy] = useState(true);
  const [options, setOptions] = useState([]);
  const [postImage, setPostImage] = useState();

  const animatedComponents = makeAnimated();

  const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const changeAnon = (e) => {
    setAnon(e.target.value);
    setAnonymous(true);
    setDisplay("Anonymous");
  };

  useEffect(() => {
    return () => postImage && URL.revokeObjectURL(postImage.preview);
  });

  const [boxes, setBoxes] = useState({});

  function handleChange(e) {
    const {
      target: { id, checked },
    } = e;
    setBoxes({
      ...boxes,
      [id]: checked,
    });
  }

  // var categoryHandle = (e) =>{
  //     getSelectedTag(Array.isArray(e)?e.map(x=>x.label):[]);
  // }

  function isDisabled() {
    const { length } = Object.values(boxes).filter(Boolean);
    return length !== 1;
  }

  // const selectHandler = (event) =>{
  //     setSelectedTag(event.target.value[0]);
  //     setIsTagPicked(true);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(anonymousMode);
    const idea = {
      title,
      description,
      content,
      anonymousMode,
      user_id,
      submission_id,
      documentURL,
      categories,
    };

    if (document != null) {
      sendDocument(submission_id, document.name).then(async (response) => {
        const file = JSON.parse(response);
        idea.documentURL = file["file_path"];
        //setDocumentURL(file['file_path']);
        console.log(`Document URL: ${idea.documentURL}`);

        //show imag
        file.preview = URL.createObjectURL(file);

        await axios
          .post(`${baseURL}/idea`, idea, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(async (response) => {
            console.log("Idea added");
            setIsPending(false);
          });
      });
    } else {
      await axios
        .post(`${baseURL}/idea`, idea, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (response) => {
          console.log("Idea added");
          setIsPending(false);
        });
    }
  };

  useEffect(() => {
    (async function () {
      const categories = await axios.get(`${baseURL}/categories`);
      //setCategories(categories.data);

      const result = categories.data.map((category) => ({
        value: category._id,
        label: category.name,
      }));
      setOptions(result);

      setBusy(false);
    })();
  }, []);

  const sendDocument = async (submissionId, fileName) => {
    const data = new FormData();
    data.append("document", document);
    console.log(document);

    try {
      const response = await axios.post(
        `${baseURL}/file/${submissionId}`,
        document
      );

      if (response.status >= 200 && response.status <= 300) {
        return JSON.stringify(response.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  if (isBusy) {
    return <div className="App">Loading...</div>;
  }
  if (!isBusy) {
    return (
      // The whole form is put in the Box with border
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className="ideacreate"
          sx={{
            border: 1,
            borderColor: "white",
            boxShadow: 4,
            borderRadius: "25px",
            margin: "2rem 3rem",
            padding: "2rem",
            maxWidth: "60%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ReturnLink />
            <TitleFrame>New Idea</TitleFrame>
            <Box sx={{ alignSelf: "center" }}>
              {/* Label section for displaying datetime data */}
              <LabelStyle>
                Closure date:
                {closedDate != null ? " " + { closedDate } : " No data"}
              </LabelStyle>
            </Box>
          </Box>

          <Divider
            sx={{
              marginBottom: "1.5rem",
            }}
          />

          <form onSubmit={handleSubmit}>
            {/* From here is title input */}
            <Box>
              <TextField
                id="outlined-basic"
                type="text"
                label="Title"
                variant="outlined"
                name="title"
                placeholder={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  width: "100%",
                }}
              />
            </Box>
            <br />
            <Box>
              <TextField
                id="outlined-basic"
                type="text"
                label="Description"
                variant="outlined"
                name="description"
                placeholder={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  width: "100%",
                }}
              />
            </Box>
            <br />
            {/* Content input */}
            <Box>
              <TextField
                id="outlined-multiline-static"
                label="Your Idea"
                multiline
                rows={8}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  width: "100%",
                }}
              />
            </Box>
            <br />
            <Box
              sx={{
                margin: "1rem",
                p: 1,
                m: 1,
                display: "flex",
              }}
            >
              <InputLabel id="attach-label">
                <Button color={"primary"} variant="text" component="span">
                  <Input
                    type="file"
                    accept="file/*"
                    id="contained-button-file"
                    color={"primary"}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setDocument(file);
                      changeHandler(event);
                    }}
                  />
                  <AttachFileIcon /> Attachments
                </Button>
              </InputLabel>
              {isFilePicked ? (
                <Box sx={{ marginLeft: "5rem" }}>
                  <Typography variant="subtitle2">
                    Filename: {documents.name} <br />
                    Filetype: {documents.type} <br />
                    Size in bytes: {documents.size} <br />
                    lastModifiedDate:
                    {documents.lastModifiedDate.toLocaleDateString()}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ marginLeft: "5rem", alignSelf: "center" }}>
                  <Typography variant="subtitle2">
                    Select a file to show detail
                  </Typography>
                </Box>
              )}
              {/* <InputLabel id="attach-label">
              <Button color={"primary"} variant="text" component="span">
                <Input
                  type="file"
                  accept="file/*"
                  id="contained-button-file"
                  color={"primary"}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setDocument(file);
                    changeHandler(event);
                  }}
                />
                <AttachFileIcon /> Attachments
              </Button>
            </InputLabel> */}
            </Box>

            {/* Tag/CategoryCreate section with customed Label */}
            <Box>
              <InputLabel id="tag-label">Select or create new tags</InputLabel>
              <Select
                labelId="tag-label"
                name="category_id"
                closeMenuOnSelect={false}
                placeholder={category}
                isClearable
                components={animatedComponents}
                isMulti
                options={options}
                onChange={(e) => {
                  setSelectedTag(
                    Array.isArray(e)
                      ? e.map((x) => {
                          return { category: x.label };
                        })
                      : []
                  );
                }}
              />
            </Box>
            <br />
            {categories.map((category) => {
              console.log(category);
              return <div>{category.name}</div>;
            })}
            {/* Terms and Conditions with overflow content not yet finished */}
            <div className="term-conditions">
              <Typography align="center" fontWeight="bold">
                Terms and Conditions
              </Typography>
              <Typography
                align="justify"
                sx={{
                  fontSize: 15,
                  padding: "0rem 1rem 0rem 1rem",
                  overflow: "scroll",
                  display: "block",
                  maxHeight: "50%",
                }}
              >
                <p>
                  Et natus molestias et doloribus. Quis quae enim dolores
                  dolores aperiam ullam eaque. Eveniet aut et qui alias
                  consequuntur expedita consequatur aspernatur.
                </p>
                <p>
                  Qui est ut modi aut ut. Non est dolor ipsum numquam doloribus
                  deserunt molestiae et animi. Voluptatem sint fuga est eum.
                </p>
              </Typography>
            </div>
            <br />
            {/* Checkbox for Terms and Submit button, should change Submitting... button by using LoadingButton */}
            <Typography align="center">
              <div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I Agree to Terms & Conditions"
                  name="agreement"
                  onChange={handleChange}
                  sx={{
                    marginBottom: "1rem",
                  }}
                />
              </div>
              <Box>
                <Switch
                  defaultValue={anonymousMode}
                  onClick={changeAnon}
                  inputProps={{ "aria-label": "controlled" }}
                />
                {displayUser}
              </Box>
              {!isPending && (
                <Button
                  variant="contained"
                  disabled={isDisabled()}
                  startIcon={<SendIcon />}
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              )}
              {isPending && (
                <Button
                  disabled
                  startIcon={<SendIcon />}
                  variant="outlined"
                  fullWidth
                >
                  Submitting...
                </Button>
              )}
            </Typography>
            <CancelBtn />
          </form>
        </Box>
      </Box>
    );
  }
};

export default IdeaCreate;
