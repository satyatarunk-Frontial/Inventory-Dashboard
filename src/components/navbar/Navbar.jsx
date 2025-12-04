// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { User } from "lucide-react";
import AuthDialog from "../login/login";


export const NAVBAR_HEIGHT = 85;

export default function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);

  // Brand text that can change on login
  const [brandText, setBrandText] = useState("The Pickls");

  function handleOpenAuth() {
    setAuthOpen(true);
  }
  function handleCloseAuth() {
    setAuthOpen(false);
  }

  // onLogin receives a user object { id, username, brandText }
  function handleLoginSuccess(user) {
    // If user has brandText, replace the brand with it; else fallback to default
    setBrandText(user?.brandText ? user.brandText : brandText);
    setAuthOpen(false);
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: NAVBAR_HEIGHT,
        zIndex: 1400,
        display: "flex",
        alignItems: "center",
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
        sx={{
          width: "100%",
          maxWidth: "1460px",
          mx: "auto",
        }}
      >
        {/* Logo + Dynamic Brand Name */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            component="img"
            src="https://thepickls.com/cdn/shop/files/the_pickls.png?v=1704872288"
            alt="The Pickls"
            sx={{
              width: { xs: 44, sm: 52 },
              height: { xs: 44, sm: 52 },
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#13331f",
              letterSpacing: "0.3px",
              display: { xs: "none", md: "block" },
            }}
          >
            {brandText}
          </Typography>
        </Stack>

        {/* Center Title - Only visible on larger screens */}
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            left: 50,
            right: 50,
            textAlign: "center",
            fontWeight: 600,
            color: "#153a1f",
            pointerEvents: "none",
            display: { xs: "none", lg: "block" },
          }}
        >
          Stock Inventory Management
        </Typography>

        {/* Profile Button */}
        <Button
          onClick={handleOpenAuth}
          variant="contained"
          startIcon={<User size={19} />}
          sx={{
            bgcolor: "#ffffff",
            color: "#1e7b34",
            fontWeight: 600,
            fontSize: "0.95rem",
            textTransform: "none",
            borderRadius: "30px",
            px: 3,
            py: 1,
            boxShadow: "0 6px 18px rgba(12,24,48,0.08)",
            transition: "transform 160ms ease, box-shadow 160ms ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 28px rgba(12,24,48,0.12)",
            },
          }}
        >
          Profile
        </Button>
      </Stack>

      <AuthDialog
        open={authOpen}
        onClose={handleCloseAuth}
        onLoginSuccess={handleLoginSuccess}
      />
    </Box>
  );
}