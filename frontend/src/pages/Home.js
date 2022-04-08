import { Search } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../components/errorHandling/PageNotFound";
import LoadingIndicator from "../components/Loading";
// import NavBar from "../components/Header/NavBar";
// import useFetch from '../services/useFetch';
import useAxios from "../services/useAxios";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Box, Divider } from "@mui/material";

const Home = () => {

    const roleName = window.sessionStorage.getItem("roleName");

    if(roleName === "Staff"){
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 1,
                    p: 3,
                    textAlign: "center",
                    alignItems: "center",
                }}
            >
                <h1>Welcome</h1>
                <img
                    src="images/staff.jpg"
                    style={{
                        height: "50%",
                        width: "50%",
                    }}
                ></img>

            </Box>
        );
    } else if(roleName === "Manager"){
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 1,
                    p: 3,
                    textAlign: "center",
                    alignItems: "center",
                }}
            >
                <h1>Welcome</h1>
                <img
                    src="images/qamanager.jpeg"
                    style={{
                        height: "50%",
                        width: "50%",
                    }}
                ></img>

            </Box>
        );
    } else if(roleName === "Coordinator"){
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 1,
                    p: 3,
                    textAlign: "center",
                    alignItems: "center",
                }}
            >
                <h1>Welcome</h1>
                <img
                    src="images/QC.jpeg"
                    style={{
                        height: "50%",
                        width: "50%",
                    }}
                ></img>

            </Box>
        );
    } else if(roleName === "Administrator"){
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 1,
                    p: 3,
                    textAlign: "center",
                    alignItems: "center",
                }}
            >
                <h1>Welcome</h1>
                <img
                    src="images/administrator.jpg"
                    style={{
                        height: "50%",
                        width: "50%",
                    }}
                ></img>

            </Box>
        );
    }
};

export default Home;
