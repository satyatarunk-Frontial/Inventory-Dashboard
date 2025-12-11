// src/pages/SettingsPage.js
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import SettingsTab from "../components/profile/SettingsTab";   

export default function SettingsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom color="primary">
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your notifications, preferences, and account security.
        </Typography>
      </Box>

      <SettingsTab />
    </Container>
  );
}