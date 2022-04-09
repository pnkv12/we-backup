import {useNavigate, useParams} from "react-router-dom";
import useFetch from "../../services/useFetch.js";
import Comments from "../Comment/Comments";
import axios from "axios";
import useAxios from "../../services/useAxios";
import {useEffect, useState} from "react";
import {Box, Divider} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import {Typography} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

const COMMENT_URL = "http://localhost:8000/v1.0/comments";
const baseURL = "http://localhost:8000/v1.0";

let viewUpdated = false;
const uid = window.sessionStorage.getItem("uid");
const SubmissionDetails = () => {

    return (
        <Box
            sx={{
                margin: "5rem 10rem 5rem 10rem",
                p: 3,
                border: 1,
                borderColor: "white",
                boxShadow: 4,
                borderRadius: "25px",
                maxWidth: "100%",
            }}
        >

        </Box>
    );
};

export default SubmissionDetails;
