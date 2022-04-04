import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const filterItem = [
  "All",
  "Latest Ideas",
  "Latest Comments",
  "Most Viewed",
  "Most Popular",
];

export default function FilterIdea() {
  const [statList, setStatList] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ alignSelf: "center" }}>
          <FilterAltIcon />
        </Box>
        <Box>
          <FormControl sx={{ width: 250 }}>
            <InputLabel id="demo-multiple-checkbox-label" size="small">
              Filter
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={statList}
              onChange={handleChange}
              input={<OutlinedInput label="Filter" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              size="small"
            >
              {filterItem.map((filterItem) => (
                <MenuItem key={filterItem} value={filterItem}>
                  <Checkbox checked={statList.indexOf(filterItem) > -1} />
                  <ListItemText primary={filterItem} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
}
