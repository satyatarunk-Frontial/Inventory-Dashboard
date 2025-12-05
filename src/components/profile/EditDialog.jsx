// src/components/profile/EditDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Camera, X } from "lucide-react";

export default function EditDialog({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        ...user,
        firstName: user.firstName || user.fullName?.split(" ")[0] || "",
        lastName: user.fullName ? user.fullName.split(" ").slice(1).join(" ") : "",
      });
    }
  }, [user, open]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm(prev => ({ ...prev, avatarBase64: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm(prev => ({ ...prev, coverBase64: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const removeCover = () => setForm(prev => ({ ...prev, coverBase64: null }));

  const handleSave = () => {
    const fullName = `${form.firstName || ""} ${form.lastName || ""}`.trim() || "User";
    onSave({ ...form, fullName });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Cover Photo */}
          <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}>
            {form.coverBase64 || user?.coverBase64 ? (
              <Box component="img" src={form.coverBase64 || user?.coverBase64} sx={{ width: "100%", height: 180, objectFit: "cover" }} />
            ) : (
              <Box sx={{ height: 180, bgcolor: "#2c3e50", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography color="white">Add Cover Photo</Typography>
              </Box>
            )}
            <IconButton component="label" sx={{ position: "absolute", bottom: 12, left: 12, bgcolor: "rgba(0,0,0,0.6)", color: "white" }}>
              <Camera size={18} />
              <input type="file" hidden accept="image/*" onChange={handleCoverChange} />
            </IconButton>
            {(form.coverBase64 || user?.coverBase64) && (
              <IconButton onClick={removeCover} sx={{ position: "absolute", bottom: 12, right: 12, bgcolor: "rgba(255,0,0,0.7)", color: "white" }}>
                <X size={18} />
              </IconButton>
            )}
          </Box>

          {/* Avatar */}
          <Box sx={{ position: "relative", mt: -10 }}>
            <Avatar src={form.avatarBase64 || user?.avatarBase64} sx={{ width: 140, height: 140, mx: "auto", border: "5px solid white" }}>
              {form.firstName?.[0] || "U"}
            </Avatar>
            <IconButton component="label" sx={{ position: "absolute", bottom: 8, right: "38%", bgcolor: "primary.main", color: "white" }}>
              <Camera size={20} />
              <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
            </IconButton>
          </Box>

          {/* Name Fields */}
          <Stack direction="row" spacing={2}>
            <TextField label="First Name" value={form.firstName || ""} onChange={e => setForm({ ...form, firstName: e.target.value })} fullWidth />
            <TextField label="Last Name" value={form.lastName || ""} onChange={e => setForm({ ...form, lastName: e.target.value })} fullWidth />
          </Stack>

          <TextField label="Role / Headline" value={form.role || ""} onChange={e => setForm({ ...form, role: e.target.value })} fullWidth />
          <TextField label="Email" type="email" value={form.email || ""} onChange={e => setForm({ ...form, email: e.target.value })} fullWidth />
          <TextField label="Phone" value={form.phone || ""} onChange={e => setForm({ ...form, phone: e.target.value })} fullWidth />
          <TextField label="Location" value={form.location || ""} onChange={e => setForm({ ...form, location: e.target.value })} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}