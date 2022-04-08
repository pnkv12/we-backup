import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageNotFound from "../../components/errorHandling/PageNotFound";
import LoadingIndicator from "../../components/Loading";
import AttachFileIcon from "@mui/icons-material/AttachFile";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
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

const Idea = () => {
  const { categories } = useParams();

  const { response, loading, error } = useAxios({
    url: `${baseURL}/ideas?limit=5&page=1`,
    method: "get",
  });

  const [ideas, setIdeas] = useState([]);
  const [ownerName, setOwnerName] = useState();

  const [page, setPage] = useState(1);

  const limit = 5;
  const startIndex = (page - 1) * limit;

  //const selectedIdeas = ideas.slice(startIndex, startIndex+limit);
  const [pagination, setPagination] = useState({

    page: 1,
  });

  const [totalPages, setTotalPages] = useState();

  const [filters, setFilters] = useState({
    limit: 5,
    page: 1,
    search: "",
  });

  const [commentsCounter, setCommentsCounter] = useState();

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
      page: num,
    });
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

  // const handleFiltersChange = (newFilters) => {
  //   console.log(newFilters);
  //   setFilters({
  //     ...filters,
  //     page: 1,
  //     search: newFilters.searchTerm,
  //   });
  // };

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
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignSelf: "center",
            marginRight: "3rem",
          }}
        >
          <FilterIdea />
        </Box>
        {/* {category && <h2>Found {filteredProducts.length} items</h2>} */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <NewIdeaBtn />
        </Box>
      </Box>
      <Divider />

      {/* Idea list */}

      <Box
        sx={{
          margin: "2rem 5rem 2rem 5rem",
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
            // const comments = await axios.get(`https://be-enterprise.herokuapp.com/v1.0/comments?ideaId=${ideaId}`);

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
                        variant="body2"
                        color="text.primary"
                      >
                        {idea.description}
                      </Typography>
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                        fullWidth
                      >
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
                          <Typography>{idea.thumbsUp.length}</Typography>
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
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            color="secondary"
                            aria-label="comments"
                            component="span"
                            size="small"
                          >
                            <ChatBubbleOutlineOutlinedIcon fontSize="inherit" />
                          </IconButton>
                          <Typography>
                            ({!commentsCounter ? "0" : commentsCounter})
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex" }} fullWidth>
                        {idea.documentURL !== "" &&
                        idea.documentURL !== null ? (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              color="grey[400]"
                              aria-label="document"
                              component="span"
                              size="small"
                            >
                              <AttachFileIcon fontSize="inherit" />
                            </Typography>
                            <Typography variant="subtitle2">
                              Document/Image included
                            </Typography>
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </>
                  }
                />
              </ListItem>
              <Divider />
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
