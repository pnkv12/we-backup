import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageNotFound from "../../components/errorHandling/PageNotFound";
import LoadingIndicator from "../../components/Loading";
import SearchFunction from "../../components/Search/SearchFunction";
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
// import ThumbsCount from "../../components/Idea/Thumbs";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Idea = () => {
  const { categories } = useParams();

  const { response, loading, error } = useAxios({
    url: "http://127.0.0.1:8000/ideas?limit=5&skip=0",
    method: "get",
  });

  const [ideas, setIdeas] = useState([]);
  const [ownerName, setOwnerName] = useState();

  const [page, setPage] = useState(1);

  const limit = 5;
  const startIndex = (page - 1) * limit;
  //const selectedIdeas = ideas.slice(startIndex, startIndex+limit);
  const [pagination, setPagination] = useState({
    limit: 5,
    skip: 0
  })
  const [totalPages, setTotalPages] = useState();
  const [filters, setFilters] = useState({
    limit: 5,
    skip: 0,
    search: '',
  });


  const [commentsCounter, setCommentsCounter] = useState();
  // useEffect(() => {
  //   (async function () {
  //     const requestUrl = `http://127.0.0.1:8000/ideas`;
  //     const response = await axios.get(requestUrl);
  //     const ideaId = response.data.ideaId;
  //     const comments = await axios.get(`http://localhost:8000/comments?ideaId=${ideaId}`);

  //     //resonse.data.ideaId
  //   })()
  // }, []);

  useEffect(() => {
    if (response != null) {
      setIdeas(response);

      response.map(async (item) => {
        // const user = await axios.get(`http://localhost:8000/users/${idea.owner}`);
        // setOwnerName(user.data.name);
        const user = await axios.get(
          `http://localhost:8000/users/${item.owner}`
        );
        setOwnerName(user.data.name);


      });
    }
  }, [response]);

  useEffect(() => {
    const fetchIdeaList = async () => {
      try {

        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://127.0.0.1:8000/ideas?${paramsString}`;
        const response = await axios.get(requestUrl);
        const re = await axios.get(`http://127.0.0.1:8000/ideas`)
        const comments = await axios.get(`http://localhost:8000/comments`);
        setTotalPages(Math.ceil(re.data.length / limit));
        setIdeas(response.data);
        setPagination(response.data);

      } catch (error) {
        console.log("failed to fetch post list", error.message);
      }
    }
    fetchIdeaList();
  }, [filters]);

  const handlePageClick = num => {
    setPage(num);
    setFilters({
      ...filters,
      skip: (num - 1) * limit,
    })
  }

  const handleFiltersChange = (newFilters) => {
    console.log(newFilters);
    setFilters({
      ...filters,
      skip: 0,
      search: newFilters.searchTerm,
    })
  }

  // const { data: ideas, loading, error } = useFetch(
  //   "idea?category=" + category
  // );

  if (error) throw error;
  if (loading) return <LoadingIndicator />;
  if (ideas.length === 0) return <PageNotFound />;

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
        {/* <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {ideas.map((idea) => {
              <Grid item xs={2} sm={4} md={4} key={idea._id}>
                <Item>
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
                    - by {ownerName}
                  </Typography>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Views: {idea.views}
                    <br />
                    Content: {idea.content}
                  </Typography>
                  <Box sx={{ display: "flex" }} fullWidth>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                      <IconButton color="secondary" aria-label="likes" component="span">
                        <ThumbUpOffAltIcon />
                      </IconButton >
                      <Typography>(1)</Typography>

                    </Box>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                      <IconButton color="secondary" aria-label="dislikes" component="span">
                        <ThumbDownOffAltIcon />
                      </IconButton >
                      <Typography>(3)</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                      <IconButton color="secondary" aria-label="comments" component="span">
                        <ChatBubbleOutlineOutlinedIcon />
                      </IconButton >
                      <Typography>{commentscounter}</Typography>
                    </Box>
                  </Box>
                </Item>
              </Grid>
            })}
          </Grid>
        </Box> */}
        {ideas.map((idea) => {
          (async function () {

            const requestUrl = `http://127.0.0.1:8000/comments?ideaId=${idea._id}`;
            const response = await axios.get(requestUrl);
            console.log(response.data.length)
            // setCommentsCounter(response.data.length);
            // const comments = await axios.get(`http://localhost:8000/comments?ideaId=${ideaId}`);

            //resonse.data.ideaId
          })()


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
                        - by {ownerName}
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
                        Views: {idea.views}
                        <br />
                        Content: {idea.content}
                      </Typography>
                      <Box sx={{ display: "flex" }} fullWidth>
                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                          <IconButton color="secondary" aria-label="likes" component="span">
                            <ThumbUpOffAltIcon />
                          </IconButton >
                          <Typography>(1)</Typography>

                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                          <IconButton color="secondary" aria-label="dislikes" component="span">
                            <ThumbDownOffAltIcon />
                          </IconButton >
                          <Typography>(3)</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                          <IconButton color="secondary" aria-label="comments" component="span">
                            <ChatBubbleOutlineOutlinedIcon />
                          </IconButton >
                          <Typography>{commentsCounter}</Typography>
                        </Box>
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
          {/* <Pagination count={10} variant="outlined" color="primary"/> */}

          <Paging pagination={pagination} totalPages={totalPages} handlePageClick={handlePageClick} />
        </Box>
      </Box>
    </Box>
  );
};

export default Idea;