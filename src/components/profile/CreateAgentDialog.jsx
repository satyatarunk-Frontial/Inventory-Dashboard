// src/components/profile/CreateAgentDialog.jsx
import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import { AuthContext } from "../../App";

export default function CreateAgentDialog({ open, onClose }) {
  const { addAgent, user } = useContext(AuthContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    countryCode: "+91",
    mobile: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    addAgent({
      id: Date.now(),
      fullName,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: `${form.countryCode} ${form.mobile}`,
      role: form.role,
      createdBy: user?.fullName || "Admin",
      lastLoggedIn: "Never",
    });
    setForm({ firstName: "", lastName: "", email: "", role: "", countryCode: "+91", mobile: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>
        Create an Agent
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* Name Row */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name *"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name *"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Email */}
          <TextField
            label="Email ID *"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          {/* Role */}
          <FormControl fullWidth>
            <InputLabel>Select a Role for the Agent *</InputLabel>
            <Select name="role" value={form.role} onChange={handleChange} label="Select a Role for the Agent *">
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Agent">Agent</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
          </FormControl>

          {/* Phone Row */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Code</InputLabel>
                <Select name="countryCode" value={form.countryCode} onChange={handleChange} label="Code">
                  <MenuItem value="+91">+91</MenuItem>
                  <MenuItem value="+1">+1</MenuItem>
                  <MenuItem value="+44">+44</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="WhatsApp Mobile No. *"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Enter 10-digit number"
              />
            </Grid>
          </Grid>

          {/* WhatsApp Note */}
          <Box
            sx={{
              bgcolor: "#e3f2fd",
              p: 2,
              borderRadius: 2,
              border: "1px solid #81d4fa",
            }}
          >
            <Typography variant="body2" color="info.contrastText">
              Please ensure this number has WhatsApp. An OTP will be sent to this number on WhatsApp while logging in.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button onClick={onClose} size="large">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          size="large"
          sx={{ bgcolor: "#006400", "&:hover": { bgcolor: "#004d00" }, minWidth: 140 }}
        >
          Save Agent
        </Button>
      </DialogActions>
    </Dialog>
  );
}