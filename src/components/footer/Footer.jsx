// src/components/Footer.jsx
import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer({
  logoSrc = "https://frontial.com/wp-content/uploads/2025/02/Frontial-Salesforce-Partner-India.png",
  logoAlt = "Forntial",
}) {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 1,
        background: "linear-gradient(135deg, rgba(255,255,255,0.78), rgba(245, 248, 255, 0.72))",
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
        borderTop: "1px solid rgba(16,24,40,0.04)",
        boxShadow: "0 -6px 30px rgba(16,24,40,0.04)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link
            href="https://frontial.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Forntial home"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              
              "&:focus": { outline: (theme) => `3px solid ${theme.palette.primary.light}`, outlineOffset: 4 },
              "&:hover img": { transform: "translateY(-2px) scale(1.02)" },
            }}
          >
            <Box
              sx={{
                width: { xs: 140, sm: 180, md: 240 }, 
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(13, 28, 63, 0.06)",
                background: "rgba(255,255,255,0.6)",
                p: { xs: 0.5, sm: 1 },
                flexShrink: 0,
              }}
            >
              <img
                src={logoSrc}
                alt={logoAlt}
                style={{
                  width: "100%",
                  height: "50px",
                  display: "block",
                  objectFit: "contain",
                  imageRendering: "auto",
                  transition: "transform .18s ease",
                }}
              />
            </Box>
          </Link>

          {/* title + subtitle */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
            <Link
              href="https://frontial.com/"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 15, sm: 16, md: 18 },
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
            >
              
            </Link>

            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
              Stock Analytics Dashboard
            </Typography>
          </Box>
        </Box>

        {/* RIGHT: small copyright / message */}
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
          © {new Date().getFullYear()} Forntial — All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
