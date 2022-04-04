import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { useAppContext } from "../../lib/contextLib";
import { Box } from "@mui/material";
import axios, * as others from "axios";
import { Navigate } from "react-router-dom";
import useAxios from "../../services/useAxios";
import LoadingIndicator from "../../components/Loading";
import Cookies from "universal-cookie";
import { TrainOutlined } from "@material-ui/icons";

const baseURL = "https://33c6-171-232-148-95.ap.ngrok.io/v1.0";

function Login(props) {
  // const cookies = new Cookies();
  const [user, setUser] = useState({ username: "" });
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useAppContext();

  const logIn = async (details) => {
    try {
      const response = await axios.post(
        `${baseURL}/login`,
        {
          username: details.username,
          password: details.password,
        },
        {
          withCredentials: true,
          // headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
      console.log(response.headers);

      // let cookie = response.headers["set-cookie"];
      // console.log(cookie);

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser({
          username: details.username,
          password: details.password,
        });
        window.sessionStorage.setItem("username", details.username);
        window.sessionStorage.setItem("fullname", response.data.fullname);
        window.sessionStorage.setItem("password", details.password);
        window.sessionStorage.setItem("isAuthenticated", true);
        // window.sessionStorage.setItem("logged", details.logged);
        // window.sessionStorage.setItem("userId", details.userId);
        // window.sessionStorage.setItem("role", details.roleId);
      }
    } catch (error) {
      console.error(error);
      setError("Username or Password do not match!");
    }
  };

  return <LoginForm Login={logIn} error={error} />;
}

export default Login;
