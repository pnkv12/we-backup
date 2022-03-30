import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Divider } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import loggedInUser from "../../data/login-user.json";
import axios from "axios";

const pages = ["Ideas", "Employees", "Dashboard"];

const settings = ["Category", "Your Ideas"];

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userTitle = `${window.localStorage.firstName}`;
  
  let navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      const token = window.localStorage.getItem("authToken");
      const response = await axios({
        method: "post", //you can set what request you want to be
        url: "http://127.0.0.1:8000/users/logout",
        headers: {
          // Authorization: 'Bearer ' + `${loggedInUser.token}`
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // console.log(response.status);
        window.localStorage.clear();
        // window.localStorage.setItem('isAuthenticated', false);
        navigate("/login", { replace: true });
        props.clearToken(false);
        window.location.reload(false);
      }
    } catch (e) {
      throw e;
    }
  };

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  return (
    <AppBar position="static" sx={{ borderRadius: "0px 0px 25px 25px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img
              src="images/Logo-Greenwich.png"
              alt="FPTGreenwich"
              style={{
                maxHeight: "3rem",
                marginRight: "2rem",
                display: { xs: "none", md: "flex" },
              }}
            ></img>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {/* <Typography textAlign="center">{page}</Typography> */}
                  <Button
                    component={Link}
                    sx={{ my: 1, color: "primary", display: "block" }}
                    to={page === "Ideas" ? "/ideas" : `/${page.toLowerCase()}`}
                  >
                    {page}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  marginRight: "2rem",
                  color: "white",
                  display: "block",
                  textAlign: "center",
                }}
                to={page === "Ideas" ? "/ideas" : `/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, marginRight: "1rem" }}>
            <IconButton
              color="whiteIcon"
              aria-label={notificationsLabel(100)}
              sx={{ marginRight: "2rem" }}
            >
              <Badge badgeContent={0} color="badge">
                <MailIcon />
              </Badge>
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                key={userTitle}
                onClick={handleCloseUserMenu}
                divider={true}
              >
                <Typography color="primary">Hello,</Typography>
                <Button
                  component={Link}
                  sx={{
                    my: 1,
                    color: "primary",
                    display: "block",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  to={userTitle === "Username!" ? "/friend!" : `/${userTitle}`}
                >
                  {userTitle}
                </Button>
              </MenuItem>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                  divider={true}
                >
                  <Button
                    component={Link}
                    to={setting === "Category" ? "/categories" : `/${setting}`}
                  >
                    {setting}
                  </Button>
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleCloseUserMenu();
                }}
              >
                <Typography color="error">
                  <LogoutIcon fontSize="small" /> Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
