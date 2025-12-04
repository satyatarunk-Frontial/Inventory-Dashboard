// src/components/navbar/Navbar.jsx

import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LogOut, User, Settings } from "lucide-react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

export const NAVBAR_HEIGHT = 85;

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  if (!authContext) {
    console.error("Navbar rendered outside AuthProvider");
    return null;
  }

  const { isLoggedIn, logout } = authContext;

  if (!isLoggedIn) {
    return null;
  }

  // Get current logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Dynamic values from user
  const displayName = user?.username?.split("@")[0] || "User";
  const brandText = user?.brandText || "The Pickls"; // This is what you wanted!

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: NAVBAR_HEIGHT,
        zIndex: 1400,
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBFB 100%)",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
        boxShadow: "0 6px 18px rgba(12,24,48,0.04)",
        px: { xs: 2, sm: 4 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%", maxWidth: "1460px", mx: "auto" }}
      >
        {/* Logo + Dynamic Brand Name */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            component="img"
            src="https://thepickls.com/cdn/shop/files/the_pickls.png?v=1704872288"
            alt={brandText}
            sx={{
              width: { xs: 44, sm: 52 },
              height: { xs: 44, sm: 52 },
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#13331f",
              display: { xs: "none", md: "block" },
              letterSpacing: "0.5px",
            }}
          >
            {brandText}  {/* ← This changes per user now! */}
          </Typography>
        </Stack>

        {/* Center Title */}
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            left: 60,
            right: 60,
            textAlign: "center",
            fontWeight: 600,
            color: "#153a1f",
            pointerEvents: "none",
            display: { xs: "none", lg: "block" },
          }}
        >
          Stock Inventory Management
        </Typography>

        {/* Avatar Dropdown */}
        <Tooltip title="Account settings">
          <IconButton onClick={handleAvatarClick}>
            <Avatar
              sx={{
                width: 46,
                height: 46,
                bgcolor: "#289DD9",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 8,
            sx: { mt: 1.5, minWidth: 200, borderRadius: 2 },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem disabled sx={{ opacity: 0.8 }}>
            <User size={18} style={{ marginRight: 12 }} />
            {displayName}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <Settings size={18} style={{ marginRight: 12 }} />
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <LogOut size={18} style={{ marginRight: 12 }} />
            Logout
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
}