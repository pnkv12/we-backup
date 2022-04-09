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
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { lightBlue, grey } from "@mui/material/colors";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Typography } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import Switch from "@mui/material/Switch";
import axios from "axios";
import useAxios from "../../services/useAxios";

// Mới tạo IdeaButtons.js trong Idea(components), chứa 3 function một cái là dạng link Back, cái thứ 2 là nút Cancel, 3 là nút Create Idea
import { ReturnLink, CancelBtn } from "./IdeaButtons";

const Input = styled("input")({
  display: "none",
});

// const Terms = styled("div")({
//     textAlign: "justify",
//     fontSize: 15,
//     padding: "0rem 1rem 0rem 1rem",
//     overflow: "scroll",
//     display: "block",
//     maxHeight: "50%",
// });

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 30,
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
//     const response = await axios.get(`http://localhost:8000/v1.0/categories`, {
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
  const department_id = window.sessionStorage.getItem("department");

  var date = new Date();
  const [idea, setIdea] = useState(null);
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState(null);
  const [content, setContent] = useState("Please input your idea");
  const [anonymousMode, setAnonymous] = useState(false);
  const [user_id, setUserId] = useState(uid);
  const [submission_id, setSubmissionId] = useState("624fa5fe94814c446e5a6911");
  const [documents, setSelectedFile] = useState([]);
  const [document, setDocument] = useState(null);
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

  const animatedComponents = makeAnimated();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

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
    setUserId(uid)
    console.log(user_id);


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

    // setIsPending(true);

    if (document != null) {

      sendDocument(submission_id, document.name).then(async (response)=>{

        const file = JSON.parse(response)
        idea.documentURL = file['file_path'];
        idea.file_id = file['file_drive_id'];
        idea.file_name = document.name;

        console.log(`Document URL: ${idea.documentURL}`);

        await axios
            .post("http://localhost:8000/v1.0/idea", idea, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(async (response) => {
              console.log("Idea added");
              setIsPending(false);
            });
      })
    } else {
      await axios
          .post("http://localhost:8000/v1.0/idea", idea, {
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
      const categories = await axios.get(
        `http://localhost:8000/v1.0/categories`
      );
      //setCategories(categories.data);

      const result = categories.data.map((category) => ({
        value: category._id,
        label: category.name,
      }));

      console.log(result);

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
        `http://localhost:8000/v1.0/file/${submissionId}`,
        data
      );

      if (response.status >= 200 && response.status <= 300) {
        return JSON.stringify(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (isBusy) {
    return <div className="App">Loading...</div>;
  }
  if (!isBusy) {
    return (
      // The whole form is put in the Box with border
      <Box
        className="ideacreate"
        sx={{
          border: 1,
          borderColor: "white",
          boxShadow: 4,
          borderRadius: "25px",
          margin: "2rem 3rem",
          padding: "2rem",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ReturnLink />
          <TitleFrame>Create idea</TitleFrame>
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
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Your Idea"
              multiline
              rows={4}
              // defaultValue={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                width: "100%",
              }}
            />
          </div>
          <br />
          {/* <div>
                    <label>Thumbs</label>
                    <input type="textarea" name="thumbs" placeholder={thumbs_up} rows ="4" onChange={e => setThumbsUp(e.target.value)} />
                    <input type="textarea" name="thumbs" placeholder={thumbs_down} rows ="4" onChange={e => setThumbsDown(e.target.value)} />
                </div>
                <br/> */}

          {/* Upload Photos and Files are put in Box and flexed */}
          <Box
            sx={{
              margin: "1rem",
              display: "flex",
              p: 1,
              m: 1,
              justifyContent: "space-evenly",
            }}
          >
            <InputLabel htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setDocument(file);
                  changeHandler(event);
                }}
              />
              <Button color={"primary"} variant="text" component="span">
                <PhotoCamera />
                Upload Photo
              </Button>
            </InputLabel>
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
          </Box>

          {isFilePicked ? (
            <div>
              <p>Filename: {documents.name}</p>
              <p>Filetype: {documents.type}</p>
              <p>Size in bytes: {documents.size}</p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
          {/* <div>
        </div>
        <br />


          {/* Tag/CategoryCreate section with customed Label */}
          <div>
            <InputLabel id="tag-label">Select or create new tags</InputLabel>
            <Select
              labelId="tag-label"
              name="tag"
              closeMenuOnSelect={false}
              placeholder={category}
              isClearable
              components={animatedComponents}
              isMulti
              options={options}
              onChange={(e) => {
                setSelectedTag(Array.isArray(e) ? e.map((x) => {
                  return { category: x.label }
                }) : [])
              }
              }
            />
          </div>
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
                Et natus molestias et doloribus. Quis quae enim dolores dolores
                aperiam ullam eaque. Eveniet aut et qui alias consequuntur
                expedita consequatur aspernatur.
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
    );
  }
};

export default IdeaCreate;
