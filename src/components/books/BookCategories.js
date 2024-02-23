import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";

export const booksCategories = [
  {
    id: "all",
    category: "All"
  },
  {
    id: "12s",
    category: "Love and Dating"
  },
  {
    id: "1bs",
    category: "Productivity"
  },

  {
    id: "coom",
    category: "Communication Skills"
  },
  {
    id: "1ls",
    category: "Interpersonal Relationships"
  },
  {
    id: "5sk",
    category: "Mindfulness"
  },
  {
    id: "con489",
    category: "Confidence"
  },
  {
    id: "1s",
    category: "Money and Finance"
  },
  {
    id: "9qs",
    category: "Confidence"
  },
  {
    id: "oqs",
    category: "History"
  },
  {
    id: "naqs",
    category: "Masculinity"
  },
  {
    id: "hqqs",
    category: "Health and Fitness"
  }
];

export default function BookCategories({ setCurrentCategory }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (prop) => {
    setAnchorEl(null);
    setCurrentCategory(prop);
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
        {booksCategories?.map((category) => (
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
