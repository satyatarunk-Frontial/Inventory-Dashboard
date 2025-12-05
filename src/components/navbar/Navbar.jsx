// src/components/navbar/Navbar.jsx
import React, { useContext, useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

export const NAVBAR_HEIGHT = 85;

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [displayName, setDisplayName] = useState("User");
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [brandText, setBrandText] = useState("The Pickls");

  // User update listener — localStorage + event se
  useEffect(() => {
    const updateUserInfo = () => {
      const saved = localStorage.getItem("user");
      if (saved) {
        try {
          const u = JSON.parse(saved);
          setDisplayName(u.fullName || u.username?.split("@")[0] || "User");
          setAvatarSrc(u.avatarBase64 || null);
          setBrandText(u.brandText || "The Pickls");
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    };

    updateUserInfo(); // Pehli baar load
    window.addEventListener("userUpdated", updateUserInfo);
    window.addEventListener("storage", updateUserInfo);

    return () => {
      window.removeEventListener("userUpdated", updateUserInfo);
      window.removeEventListener("storage", updateUserInfo);
    };
  }, []);

  // Logo based on brand
  const logoUrl =
    brandText === "Fevi"
      ? "/By The fevi.png"
      : "https://thepickls.com/cdn/shop/files/the_pickls.png?v=1704872288";

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
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
        px: { xs: 1, sm: 2 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        {/* Left - Logo + Brand Name */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            component="img"
            src={logoUrl}
            alt={brandText}
            sx={{
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              borderRadius: "50%",
              objectFit: "contain",
              background: "white",
              p: 0.5,
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#13331f",
              display: { xs: "none", md: "block" },
              letterSpacing: "0.8px",
            }}
          >
            {brandText}
          </Typography>
        </Stack>

        {/* Center Title */}
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontWeight: 600,
            color: "#153a1f",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            display: { xs: "none", lg: "block" },
          }}
        >
          Stock Inventory Management
        </Typography>

        {/* Right - Avatar */}
        <Tooltip title="Account settings">
          <IconButton onClick={handleAvatarClick}>
            <Avatar
              src={avatarSrc}
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
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/profile");
            }}
          >
            <User size={18} style={{ marginRight: 12 }} />
            Profile
          </MenuItem>
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