import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Box } from "@mui/material";
import { Typography } from '@material-ui/core';


function ThumbsCount() {
    return (
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
                <Typography>(45)</Typography>
            </Box>
        </Box>

    );
}

export default ThumbsCount;