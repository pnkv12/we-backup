import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import PopUp from "../../components/PopUp/PopUp";
import { Box } from "@mui/material";
import axios, * as others from "axios";
import { Navigate } from "react-router-dom";
import useAxios from "../../services/useAxios";
import LoadingIndicator from "../../components/Loading";
import Cookies from "universal-cookie";

const baseURL = "https://33c6-171-232-148-95.ap.ngrok.io/v1.0";

function getSessionData(userId, data) {
  const userData = sessionStorage.getItem(userId);
  if (!userData) {
    return data;
  }
  console.log(data);
  return JSON.parse(userData);
}

function Login(props) {
  // const cookies = new Cookies();
  // const [buttonPopup, setButtonPopup] = useState(false);
  const [user, setUser] = useState(getSessionData("userId", false));
  const [error, setError] = useState("");

  //This will run everytime the variable is updated, ensure most recent data is saved to storage, good for Edit User
  // useEffect(() => {
  //   sessionStorage.setItem("_id", JSON.stringify(user));
  // }, [setUser]);

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
        props.authenticate(true);

        setUser({
          username: details.username,
          password: details.password,
        });
        window.sessionStorage.setItem("username", details.username);
        window.sessionStorage.setItem("fullname", response.data.fullname);
        window.sessionStorage.setItem("role", response.data.role_id);
        window.sessionStorage.setItem("password", details.password);

        // window.sessionStorage.setItem("logged", details.logged);
        // window.sessionStorage.setItem("userId", details.userId);
        // window.sessionStorage.setItem("role", details.role);
        // window.localStorage.setItem("isAuthenticated", true);
      }
    } catch (error) {
      console.error(error);
      setError("Username or Password do not match!");
    }
  };

  // const logOut = async () => {
  //   try {
  //     const response = axios.get(`${baseURL}/logout`, {
  //       withCredentials: true,
  //     });

  //     // const response = await axios(
  //     //   {
  //     //     method: "post", //you can set what request you want to be
  //     //     url: `${baseURL}/logout`,
  //     //   },
  //     //   { withCredentials: true }
  //     // );

  //     if (response.status === 200) {
  //       props.authenticate(false);

  //       setUser({ username: "", password: "" });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setError("Username or Password do not match!");
  //   }
  // };

  return <LoginForm Login={logIn} error={error} />;
}

export default Login;
