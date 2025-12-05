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
} from "@mui/material";
import { Camera } from "lucide-react";

export default function EditDialog({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(user || {});
  }, [user, open]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatarBase64: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
          {/* Avatar Upload */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={form.avatarBase64 || user?.avatarBase64}
                sx={{ width: 100, height: 100, fontSize: 40 }}
              >
                {form.fullName?.[0] || user?.fullName?.[0] || "J"}
              </Avatar>
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <Camera size={18} />
                <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
              </IconButton>
            </Box>
          </Box>

          {/* Form Fields */}
          <TextField
            label="Full Name"
            value={form.fullName || ""}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            fullWidth
          />
          <TextField
            label="Role"
            value={form.role || ""}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            fullWidth
          />
          <TextField
            label="Location"
            value={form.location || ""}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}