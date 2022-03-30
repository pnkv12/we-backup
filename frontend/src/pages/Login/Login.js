import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import PopUp from "../../components/PopUp/PopUp";
import { Box } from "@mui/material";
import axios, * as others from "axios";
import loggedInUser from "../../data/login-user.json";
import { Navigate } from "react-router-dom";
import useAxios from "../../services/useAxios";
import LoadingIndicator from "../../components/Loading";

const baseURL = "http://localhost:8000";

function Login(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [user, setUser] = useState({ username: "" });
  const [error, setError] = useState("");

  const logIn = async (details) => {
    try {
      const response = await axios.post(`${baseURL}/users/login`, {
        email: details.username,
        password: details.password,
      });

      if (response.status === 200) {
        props.authenticate(true);

        setUser({
          name: response.data.name,
          username: details.username,
        });
        window.localStorage.setItem("authToken", response.data.token);
        window.localStorage.setItem("firstName", response.data.user.name);
        window.localStorage.setItem("email", response.data.user.email);
        window.localStorage.setItem("password", response.data.user.password);
        window.localStorage.setItem("age", response.data.user.age);
        window.localStorage.setItem("isAuthenticated", true);

      }
    } catch (error) {
      console.error(error);
      setError("Username or Password do not match!");
    }
  };

  const logOut = async () => {
    let token = window.localStorage.getItem("authToken");

    try {
      const response = await axios({
        method: "post", //you can set what request you want to be
        url: `${baseURL}/users/logout`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        props.authenticate(false);

        setUser({ name: "", username: "" });
        window.localStorage.setItem("firstName", "");
        window.localStorage.setItem("isAuthenticated", false);
      }
    } catch (error) {
      console.error(error);
      setError("Username or Password do not match!");
    }
  };

  return (
    <Box component="main">
      {user.username !== "" ? (
        // show response of the request
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={() => setButtonPopup(true)}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={logIn} error={error} />
      )}
      <PopUp trigger={buttonPopup} setTrigger={setButtonPopup} setUser={logOut}>
        <h3>Confirm Log out?</h3>
      </PopUp>
    </Box>
  );
}

export default Login;
