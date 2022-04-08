import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageNotFound from "../../components/errorHandling/PageNotFound";
import LoadingIndicator from "../../components/Loading";
import SearchFunction from "../../components/Search/SearchFunction";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachFileIcon from '@mui/icons-material/AttachFile';
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

const baseURL = "http://localhost:8000/v1.0";
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
    url: `${baseURL}/ideas?limit=5&page=1`,
    method: "get",
  });

  const [ideas, setIdeas] = useState([]);
  const [ownerName, setOwnerName] = useState();

  const [page, setPage] = useState(1);
  const [state, setState] = useState(0);

  const limit = 5;
  const startIndex = (page - 1) * limit;

  //const selectedIdeas = ideas.slice(startIndex, startIndex+limit);
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
  });

  const [totalPages, setTotalPages] = useState();

  const [filters, setFilters] = useState({
    limit: 5,
    page: 0,
    search: "",
  });

  const [commentsCounter, setCommentsCounter] = useState();

  useEffect(() => {
    if (response != null) {
      setIdeas(response.results);

      response.results.map(async (item) => {
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

        setTotalPages(Math.ceil(response.data.results.length / limit));
        setIdeas(response.data.results);
        setPagination(response.data.results);
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
      page: 1,
    });
  };


  const thumbUp = async (ideaId) => {
    console.log(`${uid} likes ${ideaId}`);
    await axios.post(`http://localhost:8000/v1.0/thumbUp/${ideaId}/${uid}`);
    window.location.reload(true);
  };

  const thumbDown = async (ideaId) => {
    console.log(`${uid} dislikes ${ideaId}`);
    await axios.post(`http://localhost:8000/v1.0/thumbDown/${ideaId}/${uid}`);
    window.location.reload(true);
  };


  const handleFiltersChange = (newFilters) => {
    console.log(newFilters);
    setFilters({
      ...filters,
      page: 1,
      search: newFilters.searchTerm,
    });
  };

  // const { data: ideas, loading, error } = useFetch(
  //   "idea?category=" + category
  // );

  if (error) throw error;
  if (loading) return <LoadingIndicator />;
  if (ideas.length === 0) {
    return <h1>No idea created yet</h1>;
  }

  return (
    <Box
      sx={{
        margin: "0rem 3rem",
        maxWidth: "100%",
      }}
    >
      {/* Filter area */}
      <Box
        sx={{
          display: "flex",
          p: 1,
          m: 2,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignSelf: "center",
          }}
        >
          <FilterIdea />
        </Box>
        {/* {category && <h2>Found {filteredProducts.length} items</h2>} */}

        {/* Search + Create button area */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <SearchFunction onSubmit={handleFiltersChange} />

          <NewIdeaBtn />
        </Box>
      </Box>
      <Divider />

      {/* Idea list */}

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
        {ideas.map((idea) => {
          (async function () {
            const requestUrl = `${baseURL}/comments?ideaId=${idea._id}`;
            const response = await axios.get(requestUrl);
            // setCommentsCounter(response.data.length);
            // const comments = await axios.get(`http://localhost:8000/v1.0/comments?ideaId=${ideaId}`);

            //resonse.data.ideaId
          })();

          return (
            <List>
              <ListItem alignItems="flex-start" key={idea._id}>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="h6"
                        color="text.primary"
                        data-testid="idea-title"
                      >
                        <Link
                          to={`/ideas/${idea._id}`}
                          underline="hover"
                          key={idea._id}
                        >
                          {idea.title}
                        </Link>
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
                        Content: {idea.content}
                      </Typography>
                      <Box sx={{ display: "flex" }} fullWidth>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            color="secondary"
                            aria-label="likes"
                            component="span"
                            onClick={() => thumbUp(`${idea._id}`)}
                          >
                            <ThumbUpOffAltIcon />
                          </IconButton>
                          <Typography>{idea.thumbsUp.length}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            color="secondary"
                            aria-label="dislikes"
                            component="span"
                            onClick={() => thumbDown(`${idea._id}`)}
                          >
                            <ThumbDownOffAltIcon />
                          </IconButton>
                          <Typography>{idea.thumbsDown.length}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                              color="secondary"
                              aria-label="views"
                              component="span"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <Typography>{idea.total_view}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            color="secondary"
                            aria-label="comments"
                            component="span"
                          >
                            <ChatBubbleOutlineOutlinedIcon />
                          </IconButton>
                          <Typography>{commentsCounter}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex" }} fullWidth>
                        {
                          (idea.documentURL !== "" && idea.documentURL !== null) ? (
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <IconButton
                                    color="secondary"
                                    aria-label="document"
                                    component="span"
                                >
                                  <AttachFileIcon/>
                                </IconButton>
                                <Typography>Document/Image included</Typography>
                              </Box>
                            ):(<></>)
                        }
                      </Box>
                    </>
                  }
                />
              </ListItem>
            </List>
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
