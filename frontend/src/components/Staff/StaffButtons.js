import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function CreateStaffBtn() {
  return (
    <Button
      variant="contained"
      component={RouterLink}
      to="/employees/create"
      fullWidth
      sx={{ width: "10%" }}
    >
      <AddCircleIcon />
    </Button>
  );
}
export default CreateStaffBtn;
