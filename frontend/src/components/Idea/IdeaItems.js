// import { experimentalStyled as styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import IconButton from "@mui/material/IconButton";
// import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
// import { Typography } from "@material-ui/core";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

// export default function IdeaItems() {
//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//                 {ideas.map((idea) => {
//                     <Grid item xs={2} sm={4} md={4} key={idea._id}>
//                         <Item>
//                             <Typography
//                                 sx={{ display: "inline" }}
//                                 component="span"
//                                 variant="h6"
//                                 color="text.primary"
//                                 data-testid="idea-title"

//                             >
//                                 <Link
//                                     to={`/ideas/${idea._id}`}
//                                     underline="hover"
//                                     key={idea._id}
//                                 >
//                                     {idea.title}
//                                 </Link>
//                                 - by {ownerName}
//                             </Typography>
//                             <Typography
//                                 sx={{ display: "inline" }}
//                                 component="span"
//                                 variant="body2"
//                                 color="text.primary"
//                             >
//                                 Views: {idea.views}
//                                 <br />
//                                 Content: {idea.content}
//                             </Typography>
//                             <Box sx={{ display: "flex" }} fullWidth>
//                                 <Box sx={{ display: "flex", alignItems: 'center' }}>
//                                     <IconButton color="secondary" aria-label="likes" component="span">
//                                         <ThumbUpOffAltIcon />
//                                     </IconButton >
//                                     <Typography>(1)</Typography>

//                                 </Box>
//                                 <Box sx={{ display: "flex", alignItems: 'center' }}>
//                                     <IconButton color="secondary" aria-label="dislikes" component="span">
//                                         <ThumbDownOffAltIcon />
//                                     </IconButton >
//                                     <Typography>(3)</Typography>
//                                 </Box>
//                                 <Box sx={{ display: "flex", alignItems: 'center' }}>
//                                     <IconButton color="secondary" aria-label="comments" component="span">
//                                         <ChatBubbleOutlineOutlinedIcon />
//                                     </IconButton >
//                                     <Typography>{commentscounter}</Typography>
//                                 </Box>
//                             </Box>
//                         </Item>
//                     </Grid>
//                 })}
//             </Grid>
//         </Box>
//     );
// }