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
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8000/v1.0";

const localBaseURL = "http://localhost:8000/v1.0";

function Login(props) {
  const [user, setUser] = useState({ username: "" });
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useAppContext();

  const navigate = useNavigate();


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
      console.log(response.data);


      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser({
          username: details.username,
          password: details.password,
        });
        window.sessionStorage.setItem("username", details.username);
        window.sessionStorage.setItem("fullname", response.data.fullname);
        window.sessionStorage.setItem("isAuthenticated", true);
        window.sessionStorage.setItem("uid", response.data.uid);
        window.sessionStorage.setItem("role", response.data.role);
        window.sessionStorage.setItem("roleName", response.data.roleName);
        window.sessionStorage.setItem("departmentName", response.data.departmentName);
        window.sessionStorage.setItem("department", response.data.department);
        window.sessionStorage.setItem("email", response.data.email);



      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return <LoginForm Login={logIn} error={error} />;
}

export default Login;
