import PropTypes from "prop-types";
import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { Pagination } from "@mui/material";

const Paging = ({ totalPages, handlePageClick }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);
  return (
    <Box>
      {pages.map((num) => (
        <Button
          key={num}
          onClick={() => handlePageClick(num)}
          sx={{ m: "1rem", borderRadius: "50%", fontWeight: "bold" }}
        >
          {num}
        </Button>
      ))}
    </Box>
  );
};

export default Paging;