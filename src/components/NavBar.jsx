import React from "react";
import NavLink from "./NavLink";
import { AppBar, Toolbar, Box } from "@mui/material";
import "../styles/Navbar.css";
const NavBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, backgroundColor: "#39445a" }}
    >
      <Toolbar>
        <Box>
          <NavLink />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
