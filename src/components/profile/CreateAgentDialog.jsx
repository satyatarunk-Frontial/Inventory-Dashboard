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
    lastName: "",        // Now optional
    email: "",
    role: "",
    countryCode: "+91",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = true;
    if (!form.email.trim()) newErrors.email = true;
    if (!form.role) newErrors.role = true;
    if (!form.mobile.trim()) newErrors.mobile = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const fullName = form.lastName.trim()
      ? `${form.firstName.trim()} ${form.lastName.trim()}`
      : form.firstName.trim();

    addAgent({
      id: Date.now(),
      fullName,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim() || "",
      email: form.email.trim(),
      phone: `${form.countryCode} ${form.mobile.trim()}`,
      role: form.role,
      createdBy: user?.fullName || "Admin",
      lastLoggedIn: "Never",
    });

    // Reset form
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      countryCode: "+91",
      mobile: "",
    });
    setErrors({});
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
                error={!!errors.firstName}
                helperText={errors.firstName && "First Name is required"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                fullWidth
                placeholder="Optional"
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
            error={!!errors.email}
            helperText={errors.email && "Email is required"}
          />

          {/* Role */}
          <FormControl fullWidth error={!!errors.role}>
            <InputLabel>Select a Role for the Agent *</InputLabel>
            <Select
              name="role"
              value={form.role}
              onChange={handleChange}
              label="Select a Role for the Agent *"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Guest">Guest</MenuItem>
            </Select>
            {errors.role && <Typography variant="caption" color="error">Role is required</Typography>}
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
                error={!!errors.mobile}
                helperText={errors.mobile && "Mobile number is required"}
                placeholder="Enter 10-digit number"
              />
            </Grid>
          </Grid>

          {/* WhatsApp Note */}
          <Box sx={{ bgcolor: "#e3f2fd", p: 2, borderRadius: 2, border: "1px solid #81d4fa" }}>
            <Typography variant="body2">
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