import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

function PieChart({ data }) {
  return (
    <Box>
      {/* Chart area: labels+color and chart */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Number of ideas per section
        </Typography>
        <Pie data={data} />
      </Box>
    </Box>
  );
}

export default PieChart;
