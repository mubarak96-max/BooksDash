import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { categories } from "../utils/categories";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/redux/slices/categories";

export default function CategoriesMenu({ setCurrentCategory, changeCategory }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (prop) => {
    setAnchorEl(null);
    setCurrentCategory(prop);

    dispatch(setCategory(prop));

    setTimeout(() => changeCategory(), 500);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        {categories?.map((category) => (
          <MenuItem
            key={category?.id}
            onClick={() => handleClose(category?.category)}
          >
            {category?.category}
          </MenuItem>
        ))}

        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}
