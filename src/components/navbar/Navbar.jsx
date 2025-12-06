// src/components/navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../Global/ThemeContext";
import { AuthContext } from "../../App";

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

// ⭐ IMPORT THEME
import { AppTheme } from "../../Global/themeLoader";

export const NAVBAR_HEIGHT = 85;

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [displayName, setDisplayName] = useState("User");
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [brandText, setBrandText] = useState("The Pickls");

  // ⭐ MAKE SAFE FALLBACK THEME (AVOID undefined error)
const theme = useContext(ThemeContext);

const { logout } = useContext(AuthContext);


  // User update listener
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
          console.error("Failed to parse user", e);
        }
      }
    };

    updateUserInfo();
    window.addEventListener("userUpdated", updateUserInfo);
    window.addEventListener("storage", updateUserInfo);

    return () => {
      window.removeEventListener("userUpdated", updateUserInfo);
      window.removeEventListener("storage", updateUserInfo);
    };
  }, []);

  const logoUrl =
    brandText === "Fevi"
      ? "/By The fevi.png"
      : "https://thepickls.com/cdn/shop/files/the_pickls.png?v=1704872288";

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
  handleClose();  // close menu
  logout();       // <-- MAIN FIX: this updates context instantly
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

        // ⭐ Apply dynamic theme safely
        background: theme.page_bg,
        borderBottom: `1px solid ${theme.border_color}`,
        boxShadow: theme.shadow,

        px: { xs: 1, sm: 2 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        {/* Left - Logo */}
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
              background: theme.card_bg,
              p: 0.5,
              boxShadow: theme.card_shadow_strong,
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: theme.text_primary,
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
            color: theme.text_primary,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            display: { xs: "none", lg: "block" },
          }}
        >
          Stock Inventory Management
        </Typography>

        {/* Avatar */}
        <Tooltip title="Account settings">
          <IconButton onClick={handleAvatarClick}>
            <Avatar
              src={avatarSrc}
              sx={{
                width: 46,
                height: 46,

                // ⭐ Avatar uses theme primary color
                bgcolor: theme.primary,

                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 8,
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              background: theme.card_bg,
              boxShadow: theme.shadow,
            },
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

          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/profile?tab=user-access");
            }}
          >
            <User size={18} style={{ marginRight: 12 }} />
            User Access
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/settings?tab=user-access");
            }}
          >
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
