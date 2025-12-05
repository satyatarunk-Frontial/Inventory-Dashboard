// src/components/profile/SettingsTab.jsx
import React from "react";
import { Paper, Typography, Box, Switch, FormControlLabel, TextField, MenuItem, Button } from "@mui/material";
import { Bell, Globe, Shield } from "lucide-react";

export default function SettingsTab() {
  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <Bell size={20} /> Notification Settings
        </Typography>
        <Box sx={{ display: "grid", gap: 2 }}>
          <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
          <FormControlLabel control={<Switch defaultChecked />} label="Push Notifications" />
          <FormControlLabel control={<Switch defaultChecked />} label="Inventory Alerts" />
          <FormControlLabel control={<Switch defaultChecked />} label="Low Stock Alerts" />
          <FormControlLabel control={<Switch defaultChecked />} label="Order Updates" />
        </Box>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <Globe size={20} /> Preferences
        </Typography>
        <Box sx={{ display: "grid", gap: 2, maxWidth: 400 }}>
          <TextField select label="Language" defaultValue="English" size="small">
            <MenuItem value="English">English</MenuItem>
          </TextField>
          <TextField select label="Timezone" defaultValue="Eastern Time (UTC-5)" size="small">
            <MenuItem value="Eastern Time (UTC-5)">Eastern Time (UTC-5)</MenuItem>
          </TextField>
          <TextField select label="Date Format" defaultValue="MM/DD/YYYY" size="small">
            <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
          </TextField>
          <TextField select label="Currency" defaultValue="USD ($)" size="small">
            <MenuItem value="USD ($)">USD ($)</MenuItem>
          </TextField>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <Shield size={20} /> Security Settings
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box>
            <Typography>Password</Typography>
            <Typography color="text.secondary" fontSize="0.9rem">Last changed 45 days ago</Typography>
          </Box>
          <Button variant="outlined" size="small">Change Password</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography>Two-Factor Authentication</Typography>
            <Typography color="text.secondary" fontSize="0.9rem">Add an extra layer of security</Typography>
          </Box>
          <Button variant="contained" size="small" sx={{ bgcolor: "#1a1a1a" }}>Enable 2FA</Button>
        </Box>
      </Paper>
    </Box>
  );
}