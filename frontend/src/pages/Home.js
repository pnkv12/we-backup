import { Box, Divider } from "@mui/material";

const Home = () => {
  // const { response, loading, error } = useAxios({
  //   url: "ideas",
  //   method: "get",
  // });

  // const [ideas, setIdeas] = useState([]);
  const roleName = window.sessionStorage.getItem("roleName");

  // useEffect(() => {
  //   if (response != null) {
  //     setIdeas(response);
  //   }
  // }, [response]);
  if (roleName === "Staff") {
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
          src="images/Staff.png"
          style={{
            height: "50%",
            width: "50%",
          }}
        ></img>
      </Box>
    );
  } else if (roleName === "Manager") {
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
          src="images/Manager.png"
          style={{
            height: "50%",
            width: "50%",
          }}
        ></img>
      </Box>
    );
  } else if (roleName === "Coordinator") {
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
        <h1>Welcome Coordinator</h1>
        <img
          src="images/Coordinator.jpg"
          style={{
            height: "50%",
            width: "50%",
          }}
        ></img>
      </Box>
    );
  } else if (roleName === "Administrator") {
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
        <h1>Welcome Admin!</h1>
        <img
          src="images/Admin.png"
          style={{
            height: "50%",
            width: "50%",
          }}
        ></img>
      </Box>
    );
  }
  window.location.reload(true);
};

export default Home;
