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
import { LogOut, User, Settings, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NAVBAR_HEIGHT = 85;

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [displayName, setDisplayName] = useState("User");
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [brandText, setBrandText] = useState("The Pickls");
  const [showBrands, setShowBrands] = useState(false);

  const theme = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

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
    brandText === "Flavi"
      ? "/By The fevi.png"
      : "https://thepickls.com/cdn/shop/files/the_pickls.png?v=1704872288";

  const avatarBgColor = brandText === "Flavi" ? "#f9f506ff" : "#16a34a";

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setShowBrands(false); // Auto-collapse brands when menu closes
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login", { replace: true });
  };

    const switchToBrand = (newBrand) => {
    if (brandText === newBrand) {
      handleClose();
      return;
    }

    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const user = JSON.parse(saved);
        user.brandText = newBrand;
        localStorage.setItem("user", JSON.stringify(user));

        // Trigger update in all tabs
        window.dispatchEvent(new Event("userUpdated"));
        window.dispatchEvent(new Event("storage"));

        handleClose();
        // No alert — just smooth reload
        window.location.reload();
      } catch (e) {
        console.error("Failed to switch brand", e);
      }
    }
  };
  return (
    <>
      <style jsx global>{`
        html { overflow-y: scroll; scrollbar-gutter: stable both-edges; }
        ::-webkit-scrollbar { width: 12px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: transparent; }
      `}</style>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: NAVBAR_HEIGHT,
          zIndex: 1400,
          background: theme.page_bg,
          borderBottom: `1px solid ${theme.border_color}`,
          boxShadow: theme.shadow,
          px: { xs: 1, sm: 2 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: "100%" }}>
          {/* Logo + Brand Name */}
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

          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: 600,
              color: theme.text_primary,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              display: { xs: "none", lg: "block" },
            }}
          >
            Stock Inventory Management
          </Typography>

          <Tooltip title="Account settings">
            <IconButton onClick={handleAvatarClick}>
              <Avatar
                src={avatarSrc}
                sx={{
                  width: 46,
                  height: 46,
                  bgcolor: avatarBgColor,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "scale(1.08)" },
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* Beautiful Expandable Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 8,
              sx: {
                mt: 1.5,
                minWidth: 260,
                borderRadius: 2,
                background: theme.card_bg,
                boxShadow: theme.shadow,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem disabled sx={{ opacity: 0.8, fontWeight: "bold" }}>
              <User size={18} style={{ marginRight: 12 }} />
              {displayName}
            </MenuItem>

            <Divider />

            <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>
              <User size={18} style={{ marginRight: 12 }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate("/profile?tab=user-access"); }}>
              <User size={18} style={{ marginRight: 12 }} /> User Access
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate("/settings"); }}>
              <Settings size={18} style={{ marginRight: 12 }} /> Settings
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => setShowBrands(prev => !prev)}
              sx={{ fontWeight: 600, justifyContent: "space-between" }}
            >
              Switch Account
              {showBrands ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </MenuItem>

            {showBrands && (
              <>
                <MenuItem
                  onClick={() => switchToBrand("The Pickls")}
                  sx={{
                    pl: 6,
                    fontWeight: brandText === "The Pickls" ? "bold" : "normal",
                    color: brandText === "The Pickls" ? "#16a34a" : "inherit",
                    bgcolor: brandText === "The Pickls" ? "#16a34a11" : "transparent",
                  }}
                >
                  <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    The Pickls
                    {brandText === "The Pickls" && <Check size={18} sx={{ color: "#16a34a" }} />}
                  </Box>
                </MenuItem>

                <MenuItem
                  onClick={() => switchToBrand("Flavi")}
                  sx={{
                    pl: 6,
                    fontWeight: brandText === "Flavi" ? "bold" : "normal",
                    color: brandText === "Flavi" ? "#f9f506ff" : "inherit",
                    bgcolor: brandText === "Flavi" ? "#f9f50622" : "transparent",
                  }}
                >
                  <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    Flavi
                    {brandText === "Flavi" && <Check size={18} sx={{ color: "#f9f506ff" }} />}
                  </Box>
                </MenuItem>
              </>
            )}

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <LogOut size={18} style={{ marginRight: 12 }} /> Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Box>
    </>
  );
}