import { Link as RouterLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip } from "@mui/material";

function CreateStaffBtn() {
  return (
    <Tooltip title="Create new staff">
      <IconButton
        color="primary"
        size="large"
        component={RouterLink}
        to="/employees/create"
        fullWidth
      >
        <AddCircleIcon />
      </IconButton>
    </Tooltip>
  );
}
export default CreateStaffBtn;
