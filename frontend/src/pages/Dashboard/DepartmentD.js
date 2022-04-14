import React, { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import styled from "@emotion/styled";
import { lightBlue } from "@mui/material/colors";
import { Box, Divider } from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { dashboardFlex } from "../../styles/boxStyles";
import { Typography } from "@mui/material";

const TitleFrame = styled("div")({
  color: lightBlue[600],
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: "1rem",
});

const baseURL = "https://be-enterprise.herokuapp.com/v1.0";

function DeptDropDown({ departmentList }) {
  const [department, setDepartment] = useState();
  const [mostLike, setMostLike] = useState();
  const [mostView, setMostView] = useState();
  const [lastedIdea, setlastedIdea] = useState();
  const [lastedComment, setLastedComment] = useState();
  // const [ideas, setIdeas] = useState({});
  // const userList = [];

  //   useEffect(() => {
  //     (async function () {
  //       const res = await axios({
  //         url: `${baseURL}/ideas`,
  //         method: "get",
  //       });
  //       for (var i = 0; i < res.data.length; i++) {
  //         console.log(res.data[i].user_id);
  //         userList.push(res.data[i].user_id);
  //         //console.log(userList);
  //       }
  //       setIdeas(res.data); // return res.data.length;
  //     })();
  //   }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(department);
  };
  // const handleChange = (e) => {
  //   setDepartment(e.target.value);
  // };

  const handleChange = (e) => {
    setDepartment(e.target.value);
    console.log(e.target.value);

    const selectedDept = departmentList.filter(
      (department) => department.name === e.target.value
    );
    console.log(selectedDept[0]._id);
    axios
      .get(`${baseURL}/department/statistic/${selectedDept[0]._id}`)
      .then((response) => {
        console.log(response.data);
        setMostLike(response.data.mostLike.title);
        setMostView(response.data.mostView.title);
        setlastedIdea(response.data.lasted.title);
        setLastedComment(response.data.lastedComment[0].content);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 1,
        justifyContent: "center",
      }}
    >
      <FormControl onSubmit={handleSubmit}>
        <Box>
          <Box sx={{ width: "10rem" }}>
            <InputLabel id="demo-simple-select-label">View By</InputLabel>
            <Select
              value={department}
              id="demo-simple-select"
              labelId="demo-simple-select-label"
              label="View By"
              onChange={handleChange}
              fullWidth
            >
              {departmentList.map((department) => (
                <MenuItem key={department._id} value={department.name}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={dashboardFlex}>
            <Box
              sx={{
                display: "inline-flex",
                m: 1,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              Most likes:&nbsp;
              <Typography variant="body1" color="error" fontStyle="italic">
                {mostLike !== null ? mostLike : "None"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "inline-flex",
                m: 1,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              Most views:&nbsp;
              <Typography variant="body1" color="error" fontStyle="italic">
                {mostView !== null ? mostView : "None"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "inline-flex",
                m: 1,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              Latest idea:&nbsp;
              <Typography variant="body1" color="error" fontStyle="italic">
                {lastedIdea !== null ? lastedIdea : "None"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                m: 1,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              Latest comment:&nbsp;
              <Typography variant="body1" color="error" fontStyle="italic">
                {lastedComment !== null ? lastedComment : "None"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
}

function DepartmentD() {
  const [ideas, setIdeas] = useState({});
  const [departmentList, setDepartmentList] = useState([]);
  const [itID, setItID] = useState("6249c9dcabe8dbf2e9785f4c");
  const [bizID, setBizID] = useState("6249cd25abe8dbf2e9785f8b");
  const [graphicID, setgraphicID] = useState("624f1179b1863db2972c53ad");
  var it = 0;
  var graphic = 0;
  var biz = 0;

  const [IT_stats, setITstats] = useState();
  const [BIZ_stats, setBIZstats] = useState();
  const [GRAPHIC_stats, setGRAPHICstats] = useState();

  useEffect(() => {
    (async function () {
      const deptData = await axios({
        url: `${baseURL}/departments`,
        method: "get",
      });
      // setItID(deptData.data[0]._id);
      // setBizID(deptData.data[1]._id);
      // setgraphicID(deptData.data[2]._id);
      setDepartmentList(deptData.data);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const res = await axios({
        url: `${baseURL}/ideas`,
        method: "get",
      });
      for (var i = 0; i < res.data.length; i++) {
        //console.log(res.data[i].user_id);

        const user = await axios({
          url: `${baseURL}/user/${res.data[i].user_id}`,
          method: "get",
        });
        //console.log(user.data.department_id);
        const departmentId = user.data.department_id;
        //console.log(departmentId);
        if (departmentId === itID) {
          //console.log("equal it");
          it += 1;
          //it.push(departmentId);
        } else if (departmentId === bizID) {
          //console.log("equal biz");
          biz += 1;
          //biz.push(departmentId);
        } else {
          //console.log("equal graphic");
          graphic += 1;
          //graphic.push(departmentId);
        }
      }
      setITstats(it);
      setBIZstats(biz);
      setGRAPHICstats(graphic);
      // console.log(it);
      // console.log(biz);
      // console.log(graphic);
      setIdeas(res.data); // return res.data.length;
    })();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        p: 1,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          paddingLeft: "3rem",
        }}
      >
        {/* {ideas.map((idea) => {
          return <p>
            {idea.name}
          </p>;
        })} */}

        <TitleFrame>Statistical Analysis - Department</TitleFrame>
        <Divider
          sx={{
            marginBottom: "2rem",
          }}
        ></Divider>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DeptDropDown departmentList={departmentList} />
          {/* <Box sx={{ marginLeft: "3rem" }}>Total ideas: {ideas.length}</Box> */}
        </Box>
      </Box>

      <Box
        sx={{
          alignSelf: "center",
          position: "relative",
          margin: "auto",
          padding: "2rem 2rem 2rem 2rem",
          width: "20rem",
          height: "23rem",
          boxShadow: 4,
          borderRadius: "25px",
        }}
      >
        <PieChart
          data={{
            labels: departmentList.map((departmentList) => departmentList.name),
            datasets: [
              {
                //number of ideas belong to that dept
                data: [IT_stats, BIZ_stats, GRAPHIC_stats],
                backgroundColor: ["red", "blue", "green", "yellow"],
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
}
export default DepartmentD;
