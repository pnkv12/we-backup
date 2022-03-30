import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, orange, blue, red, green } from "@mui/material/colors";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Idea from "./pages/Idea/Idea";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employees from "./pages/Employee/Employees";
import EmployeeCreate from "./pages/Employee/EmployeeCreate";
import "./App.css";
import { Box } from "@mui/material";
import IdeaCreate from "./components/Idea/IdeaCreate";
import Search from "./components/Search/SearchFunction";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import CategoryCreate from "./components/CategoryCreate";
import Comments from "./components/Comment/Comments";
import IdeaDetails from "./components/Idea/IdeaDetails";
import EmployeeUpdate from "./pages/Employee/EmployeeUpdate";

const theme = createTheme({
  palette: {
    primary: {
      main: "#42a5f5",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#66bb6a",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#f44336",
      contrastText: "#FFFFFF",
    },
    badge: {
      main: "#f44336",
      contrastText: "#FFFFFF",
    },
    whiteIcon: {
      main: "#FFFFFF",
    },
    secondary: {
      main: grey[400],
      contrastText: "grey[600]",
    },
    typography: {
      logout: {
        color: "#f44336",
      },
      button: {
        color: green[500],
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(window.localStorage.getItem("isAuthenticated"));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box className="App">
        <Router>
          {isAuthenticated ? <Header clearToken={setIsAuthenticated} /> : <></>}

          <main>
            <Routes>
              {/* // TODO 1: when not authenticated, no NavBar */}
              {/* // TODO 2: when authenticated, go to main page */}
              {/* <Route path="/" element={<Login />}></Route>{" "} */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Home />
                  ) : (
                    <Login authenticate={setIsAuthenticated} />
                  )
                }
              />

              <Route
                path="/ideas"
                element={
                  isAuthenticated ? (
                    <Idea />
                  ) : (
                    <Login authenticate={setIsAuthenticated} />
                  )
                }
              />

              <Route
                path="/ideas/:id"
                element={
                  isAuthenticated ? (
                    <IdeaDetails />
                  ) : (
                    <Login authenticate={setIsAuthenticated} />
                  )
                }
              />

              <Route path="/ideas/:category" element={<Idea />} />
              <Route path="/ideas/:filter" element={<Idea />} />

              <Route
                path="/employees"
                element={
                  isAuthenticated ? (
                    <Employees authenticate={setIsAuthenticated} />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/employees/create"
                element={
                  isAuthenticated ? (
                    <EmployeeCreate authenticate={setIsAuthenticated} />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/employees/edit/:userId"
                element={
                  isAuthenticated ? (
                    <EmployeeUpdate authenticate={setIsAuthenticated} />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <Dashboard authenticate={setIsAuthenticated} />
                  ) : (
                    <Login />
                  )
                }
              />
              {/* <Route path="/idea/idealist" element={<IdeaList />}></Route> */}

              <Route
                path="/ideas/ideacreate"
                element={
                  isAuthenticated ? (
                    <IdeaCreate />
                  ) : (
                    <Login authenticate={setIsAuthenticated} />
                  )
                }
              />

              <Route
                path="/categories"
                element={
                  isAuthenticated ? (
                    <CategoryCreate />
                  ) : (
                    <Login authenticate={setIsAuthenticated} />
                  )
                }
              />
              {/* <Route path="/your-ideas" element={}></Route> */}

              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Login authenticate={setIsAuthenticated} />
                  )
                }
              />

              <Route path="/search" element={<Search />} />
              <Route path="/comments" element={<Comments />} />
            </Routes>
          </main>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
