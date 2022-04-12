import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageNotFound from "../../components/errorHandling/PageNotFound";
import LoadingIndicator from "../../components/Loading";
import TodayIcon from "@mui/icons-material/Today";
import SearchFunction from "../../components/Search/SearchFunction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import useFetch from "../../services/useFetch";
import useAxios from "../../services/useAxios";
import { Box, Divider } from "@mui/material";
import FilterIdea from "../../components/Idea/FilterIdea";
import NewIdeaBtn from "../../components/Idea/IdeaButtons";
import axios from "axios";
import Paging from "../../components/Paging";
import queryString from "query-string";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@material-ui/core";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const uid = window.sessionStorage.getItem("uid");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Submissions = () => {
  const { response, loading, error } = useAxios({
    url: `${baseURL}/submissions`,
    method: "get",
  });

  const [submisions, setSubmissions] = useState([]);

  useEffect(() => {
    if (response != null) {
      console.log(response);

      setSubmissions(response);

      response.map(async (item) => {
        console.log(item);
        // const user = await axios.get(`${baseURL}/users/${item.user_id}`);
        // setOwnerName(user.data.name);
      });
    }
  }, [response]);

  // useEffect(() => {
  //     const fetchIdeaList = async () => {
  //         try {
  //             const paramsString = queryString.stringify(filters);
  //             const requestUrl = `${baseURL}/ideas`;
  //             const response = await axios.get(requestUrl);
  //             const re = await axios.get(`${baseURL}/ideas`);
  //             const comments = await axios.get(`${baseURL}/comments`);
  //
  //             setTotalPages(Math.ceil(response.data.results.length / limit));
  //             setIdeas(response.data.results);
  //             setPagination(response.data.results);
  //         } catch (error) {
  //             console.log("failed to fetch post list", error.message);
  //         }
  //     };
  //     fetchIdeaList();
  // }, [filters]);

  if (loading) return <LoadingIndicator />;
  if (submisions.length === 0) {
    return <h1>No submission created yet</h1>;
  }

  const downloadCSV = async (submissionId) => {
    window.location.replace(`${baseURL}/csv/download/${submissionId}`);
    await axios.get(`${baseURL}/csv/download/${submissionId}`);
  };

  return (
    <Box
      sx={{
        margin: "0rem 3rem",
        maxWidth: "100%",
      }}
    >
      <Divider />

      {/* Submissions list */}

      <Box
        sx={{
          margin: "2rem 0rem 2rem 0rem",
          padding: "1rem 2rem 2rem 2rem",
          border: 1,
          borderRadius: "25px",
          borderColor: "white",
          listStyle: "none",
          boxShadow: 4,
          maxHeight: "100%",
        }}
      >
        {submisions.map((submission) => {
          return (
            <List>
              <ListItem alignItems="flex-start" key={submission._id}>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="h5"
                        color="text.primary"
                        data-testid="idea-title"
                      >
                        {/* <Link
                          to={`/submissions/${submission._id}`}
                          underline="hover"
                          key={submission._id}
                        >
                          {submission.name}
                        </Link> */}
                        {submission.name}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="h6"
                        color="text.primary"
                        data-testid="idea-title"
                      >
                        <br />
                        Desc: {submission.description}
                      </Typography>
                      <Box sx={{ display: "flex" }} fullWidth>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            color="secondary"
                            aria-label="comments"
                            component="span"
                          >
                            <TodayIcon />
                          </IconButton>
                          <Typography>
                            Closure date: {submission.closure_date}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex" }} fullWidth>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            color="secondary"
                            aria-label="comments"
                            component="span"
                          >
                            <TodayIcon />
                          </IconButton>
                          <Typography>
                            Final closure date: {submission.final_closure_date}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex" }} fullWidth>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            color="secondary"
                            aria-label="comments"
                            component="span"
                            onClick={async () => {
                              await downloadCSV(submission._id);
                            }}
                          >
                            <CloudDownloadIcon /> Download CSV
                          </IconButton>
                        </Box>
                      </Box>
                    </>
                  }
                />
              </ListItem>
            </List>
          );
        })}
      </Box>
    </Box>
  );
};

export default Submissions;
