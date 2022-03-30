import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

// import useFetch from "../services/useFetch";
// import PageNotFound from "./errorHandling/PageNotFound";
// import LoadingIndicator from "./Loading";

const data = {
  // take the name in department
  labels: ["Math", "Biology", "Physics", "IT", "Business"],
  datasets: [
    {
      //number of ideas belong to that department
      data: [6, 7, 10, 44, 23],

      // để yên đấy, xin cảm ơn
      backgroundColor: ["red", "blue", "yellow", "green", "purple"],
    },
  ],
};

function PieChart() {
  // const { data: ideas, loading, error } = useFetch(
  //   "idea"
  // );

  // if (error) throw error;
  // if (loading) return <LoadingIndicator />;
  // if (ideas.length === 0) return <PageNotFound />;

  return (
    <Box>
      {/* <h1>{ideas.filter((idea) => idea.department = 'Math')}</h1> */}

      {/* Chart area: labels+color and chart */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          // textAlign="center"
          fontWeight="bold"
        >
          Number of ideas per department
        </Typography>
        <Pie data={data} />
      </Box>
    </Box>
  );
}

export default PieChart;
