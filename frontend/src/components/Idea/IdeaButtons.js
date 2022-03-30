import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function ReturnLink() {
  return (
    <Button component={RouterLink} to="/ideas" variant="text" color="primary">
      <ArrowBackIcon /> Back
    </Button>
  );
}

function CancelBtn() {
  return (
    <Button
      component={RouterLink}
      to="/ideas"
      variant="contained"
      color="secondary"
      sx={{ margin: "1rem 0rem" }}
      fullWidth
    >
      Cancel
    </Button>
  );
}

function NewIdeaBtn() {
  return (
    <Button
      variant="contained"
      startIcon={<AddCircleIcon />}
      component={RouterLink}
      to="/ideas/ideacreate"
    >
      New
    </Button>
  );
}

export default NewIdeaBtn;
export { ReturnLink, CancelBtn };
