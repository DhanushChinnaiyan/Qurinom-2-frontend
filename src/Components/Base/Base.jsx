import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useCommonContext } from "../StateManagement/ContextApi";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import AddIcon from "@mui/icons-material/Add";

const Base = ({ children }) => {
  const navigate = useNavigate();
  const {
    userLogedIn,
    merchant,
    handleOpenProductModal,
    getProducts,
    setUserLogedIn,
    filtered,
    setFiltered,
    handleOpenFilter,
  } = useCommonContext();

  // Logout function
  const logoutFunction = () => {
    localStorage.removeItem("authorization");
    setUserLogedIn(false);
    navigate("/login");
  };

  // Handling filter for retriving original data
  const handleFilter = () => {
    setFiltered(false);
    getProducts();
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
            {/* Adding product button for merchant */}
            {merchant && (
              <IconButton onClick={handleOpenProductModal}>
                <AddIcon sx={{ color: "white", fontSize: "25px" }} />
              </IconButton>
            )}

            {/*Checking If products are filtered or not */}
            {filtered ? (
              <IconButton onClick={handleFilter}>
                <FilterAltOffIcon sx={{ color: "white", fontSize: "25px" }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleOpenFilter}>
                <SearchIcon sx={{ color: "white", fontSize: "25px" }} />
              </IconButton>
            )}
            {/* hanling user log */}
            <Button
              onClick={userLogedIn ? logoutFunction : () => navigate("/login")}
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
              {userLogedIn ? "LOGOUT" : "LOGIN"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div>{children}</div>
    </div>
  );
};

export default Base;
