// src/components/profile/ProfileHeader.jsx
import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

export default function ProfileHeader({ user, onEdit }) {
  return (
    <Box sx={{ position: "relative", borderRadius: 3, overflow: "hidden", mb: 4 }}>
      {/* Cover Banner */}
      <Box
        sx={{
          height: { xs: 180, md: 280 },
          bgcolor: user?.coverBase64 ? "transparent" : "#1a1a1a",
          backgroundImage: user?.coverBase64 ? `url(${user.coverBase64})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Main Content */}
      <Box sx={{ position: "relative", px: { xs: 3, md: 5 }, pb: 4, bgcolor: "background.paper" }}>
        {/* Avatar */}
        <Avatar
          src={user?.avatarBase64}
          sx={{
            width: { xs: 120, md: 160 },
            height: { xs: 120, md: 160 },
            border: "6px solid white",
            position: "absolute",
            top: -80,
            left: { xs: 24, md: 40 },
          }}
        >
          {user?.fullName?.[0] || "U"}
        </Avatar>

        {/* Info Section */}
        <Box sx={{ ml: { xs: 0, md: "200px" }, pt: { xs: 14, md: 10 } }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Typography variant="h4" fontWeight="bold">
              {user?.fullName || "John Anderson"}
            </Typography>
            <Chip label="Active" size="small" color="success" sx={{ fontWeight: "bold" }} />
          </Stack>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            {user?.role || "Inventory Manager"} • Inventory Management
          </Typography>

          {/* Contact & Details Row */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 4 }}
            sx={{ mt: 3, color: "text.secondary", fontSize: "0.95rem" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Mail size={18} />
              <Typography>{user?.email || "john.anderson@company.com"}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Phone size={18} />
              <Typography>{user?.phone || "+1 (555) 123-4567"}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MapPin size={18} />
              <Typography>{user?.location || "San Francisco, CA"}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Calendar size={18} />
              <Typography>Joined {user?.joined || "March 2022"}</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Edit Button - Top Right */}
        <Button
          variant="contained"
          onClick={onEdit}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            borderRadius: 2,
            bgcolor: "#1a1a1a",
            color: "white",
            "&:hover": { bgcolor: "#000" },
            px: 3,
            py: 1,
          }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
}