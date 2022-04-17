import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { hoverStyle } from "../../styles/boxStyles";
import LoadingIndicator from "../../components/Loading";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import useAxios from "../../services/useAxios";
import { Box, Divider } from "@mui/material";
import NewIdeaBtn from "../../components/Idea/IdeaButtons";
import axios from "axios";
import Paging from "../../components/Paging";
import queryString from "query-string";
import { Typography } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Tooltip } from "@mui/material";

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";
const uid = window.sessionStorage.getItem("uid");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Idea = () => {
  const { categories } = useParams();

  const { response, loading, error } = useAxios({
    url: `${baseURL}/ideas?skip=0&limit=5`,
    method: "get",
  });

  const [ideas, setIdeas] = useState([]);
  const [ownerName, setOwnerName] = useState();

  const [page, setPage] = useState(1);

  const limit = 5;
  const startIndex = (page - 1) * limit;

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 5,
  });

  const [totalPages, setTotalPages] = useState();

  const [filters, setFilters] = useState({
    skip: 0,
    limit: 5,
  });

  // const [commentsCounter, setCommentsCounter] = useState();

  useEffect(() => {
    if (response != null) {
      setIdeas(response);
      // console.log(response);
      response.map(async (item) => {
        const user = await axios.get(`${baseURL}/users/${item.owner}`);
        setOwnerName(user.data.name);
      });
    }
  }, [response]);

  useEffect(() => {
    const fetchIdeaList = async () => {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `${baseURL}/ideas?${paramsString}`;
        const response = await axios.get(requestUrl);
        const re = await axios.get(`${baseURL}/ideas`);
        const comments = await axios.get(`${baseURL}/comments`);

        setTotalPages(Math.ceil(re.data.length / limit));
        setIdeas(response.data);
        setPagination(response.data);
      } catch (error) {
        console.log("failed to fetch post list", error.message);
      }
    };
    fetchIdeaList();
  }, [filters]);

  const handlePageClick = (num) => {
    setPage(num);
    setFilters({
      ...filters,
      skip: (num - 1) * limit,
    });
  };
  let navigate = useNavigate();

  const toDetail = (ideaId) => {
    navigate(`/ideas/${ideaId}`);
  };

  const thumbUp = async (ideaId) => {
    console.log(`${uid} likes ${ideaId}`);
    await axios.post(`${baseURL}/thumbUp/${ideaId}/${uid}`);
    window.location.reload(false);
  };

  const thumbDown = async (ideaId) => {
    console.log(`${uid} dislikes ${ideaId}`);
    await axios.post(`${baseURL}/thumbDown/${ideaId}/${uid}`);
    window.location.reload(false);
  };

  if (error) throw error;
  if (loading) return <LoadingIndicator />;
  if (ideas.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2, p: 2 }}>
        <NewIdeaBtn />
        <h1>Be the first to post new idea</h1>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        margin: "0rem 3rem",
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 1,
          m: 2,
          justifyContent: "flex-end",
        }}
      >
        <NewIdeaBtn />
      </Box>
      <Divider />

      {/* Idea list */}

      <Box>
        {ideas.map((idea) => {
          (async function () {
            const requestUrl = `${baseURL}/comments?ideaId=${idea._id}`;
            const response = await axios.get(requestUrl);
            // setCommentsCounter(response.data.length);
            // const comments = await axios.get(`https://be-enterprise.herokuapp.com/v1.0/comments?ideaId=${ideaId}`);

            //resonse.data.ideaId
          })();

          return (
            <Box sx={hoverStyle}>
              <Box
                onClick={() => toDetail(`${idea._id}`)}
                key={idea._id}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  data-testid="idea-title"
                >
                  {idea.title}
                </Typography>

                <Typography
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                  data-testid="idea-desc"
                >
                  {idea.description}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "flex-end" }}
                fullWidth
              >
                {idea.documentURL !== "" && idea.documentURL !== null ? (
                  <Tooltip title="Documents/Images included">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AttachFileIcon color="secondary" fontSize="small" />
                    </Box>
                  </Tooltip>
                ) : (
                  <></>
                )}
                <Divider orientation="vertical" flexItem></Divider>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="secondary"
                    aria-label="likes"
                    component="span"
                    size="small"
                    onClick={() => thumbUp(`${idea._id}`)}
                  >
                    <ThumbUpOffAltIcon fontSize="inherit" />
                  </IconButton>
                  <Typography fontSize="small">
                    {idea.thumbsUp.length}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="secondary"
                    aria-label="dislikes"
                    component="span"
                    size="small"
                    onClick={() => thumbDown(`${idea._id}`)}
                  >
                    <ThumbDownOffAltIcon fontSize="inherit" />
                  </IconButton>
                  <Typography>{idea.thumbsDown.length}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="secondary"
                    aria-label="views"
                    component="span"
                    size="small"
                  >
                    <VisibilityIcon fontSize="inherit" />
                  </IconButton>
                  <Typography>
                    ({!idea.total_view ? "0" : idea.total_view})
                  </Typography>
                </Box>

                {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      color="secondary"
                      aria-label="comments"
                      component="span"
                      size="small"
                    >
                      <ChatBubbleOutlineOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  </Box> */}
              </Box>
            </Box>
          );
        })}
        {/* Pagination area */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paging
            pagination={pagination}
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Idea;
