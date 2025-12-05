// src/components/profile/ProfileHeader.jsx
import React from "react";
import { Box, Avatar, Typography, Button, Chip } from "@mui/material";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

export default function ProfileHeader({ user, onEdit }) {
  return (
    <Box sx={{ bgcolor: "#f8f9fa", p: 4, borderRadius: 3, mb: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 3 }}>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center" }}>
          <Avatar src={user?.avatarBase64} sx={{ width: 80, height: 80, fontSize: 32 }}>
            {user?.fullName?.[0] || "J"}
          </Avatar>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6" fontWeight="bold">{user?.fullName || "John Anderson"}</Typography>
              <Chip label="Active" size="small" color="success" />
            </Box>
            <Typography color="text.secondary" sx={{ mb: 1 }}>
              {user?.role || "Inventory Manager"} • Inventory Management
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, color: "text.secondary", fontSize: "0.9rem" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Mail size={16} /> {user?.email || "john.anderson@company.com"}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Phone size={16} /> {user?.phone || "+1 (555) 123-4567"}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <MapPin size={16} /> {user?.location || "San Francisco, CA"}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Calendar size={16} /> Joined {user?.joined || "March 2022"}
              </Box>
            </Box>
          </Box>
        </Box>

        <Button variant="contained" onClick={onEdit} sx={{ borderRadius: 2, bgcolor: "#1a1a1a", "&:hover": { bgcolor: "#000" } }}>
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
}