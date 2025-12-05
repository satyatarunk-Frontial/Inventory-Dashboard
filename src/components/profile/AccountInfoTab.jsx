// src/components/profile/AccountInfoTab.jsx
import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Edit2, Check, X } from "lucide-react";
import { AuthContext } from "../../App";

export default function AccountInfoTab() {
  const { user, updateUser } = useContext(AuthContext);

  const defaultUser = {
    fullName: "John Anderson",
    firstName: "John",
    lastName: "Anderson",
    email: "john.anderson@company.com",
    phone: "+1 (555) 123-4567",
    dob: "January 15, 1988",
    address: "123 Business Street, Suite 400",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
    companyName: "TechCorp Industries",
    department: "Inventory Management",
    position: "Inventory Manager",
    employeeId: "EMP-2024-1234",
    manager: "Sarah Williams",
    workLocation: "San Francisco HQ",
  };

  const [form, setForm] = useState({ ...defaultUser, ...user });
  const [editing, setEditing] = useState({ personal: false, company: false });

  useEffect(() => {
    setForm(prev => ({ ...prev, ...defaultUser, ...user }));
  }, [user]);

  const handleSave = () => {
    const finalData = {
      ...form,
      fullName: `${form.firstName || ""} ${form.lastName || ""}`.trim() || "User",
    };
    updateUser(finalData);
    setEditing({ personal: false, company: false });
  };

  const handleCancel = () => {
    setForm({ ...defaultUser, ...user });
    setEditing({ personal: false, company: false });
  };

  const createFieldHandler = useCallback((field) => {
    return (e) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const InfoRow = React.memo(({ label, field, section }) => {
    const isEditing = editing[section];
    const value = form[field] || "";

    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography color="text.secondary" sx={{ minWidth: 140, fontSize: "0.95rem" }}>
          {label}
        </Typography>

        <TextField
          key={`${field}-${isEditing}`}
          size="small"
          value={value}
          onChange={createFieldHandler(field)}
          variant={isEditing ? "outlined" : "standard"}
          InputProps={{
            readOnly: !isEditing,
            disableUnderline: !isEditing,
          }}
          sx={{
            width: 250,
            "& .MuiInputBase-input": {
              fontWeight: isEditing ? "normal" : "medium",
              cursor: isEditing ? "text" : "default",
            },
          }}
        />
      </Box>
    );
  });

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
            {editing.personal ? (
              <Box>
                <IconButton size="small" onClick={handleSave}><Check color="green" /></IconButton>
                <IconButton size="small" onClick={handleCancel}><X color="red" /></IconButton>
              </Box>
            ) : (
              <IconButton size="small" onClick={() => setEditing(prev => ({ ...prev, personal: true }))}>
                <Edit2 size={18} />
              </IconButton>
            )}
          </Box>

          <InfoRow label="First Name" field="firstName" section="personal" />
          <InfoRow label="Last Name" field="lastName" section="personal" />
          <InfoRow label="Email Address" field="email" section="personal" />
          <InfoRow label="Phone Number" field="phone" section="personal" />
          <InfoRow label="Date of Birth" field="dob" section="personal" />
          <InfoRow label="Address" field="address" section="personal" />
          <InfoRow label="City" field="city" section="personal" />
          <InfoRow label="State" field="state" section="personal" />
          <InfoRow label="ZIP Code" field="zip" section="personal" />
          <InfoRow label="Country" field="country" section="personal" />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">Company Information</Typography>
            {editing.company ? (
              <Box>
                <IconButton size="small" onClick={handleSave}><Check color="green" /></IconButton>
                <IconButton size="small" onClick={handleCancel}><X color="red" /></IconButton>
              </Box>
            ) : (
              <IconButton size="small" onClick={() => setEditing(prev => ({ ...prev, company: true }))}>
                <Edit2 size={18} />
              </IconButton>
            )}
          </Box>

          <InfoRow label="Company Name" field="companyName" section="company" />
          <InfoRow label="Department" field="department" section="company" />
          <InfoRow label="Position" field="position" section="company" />
          <InfoRow label="Employee ID" field="employeeId" section="company" />
          <InfoRow label="Manager" field="manager" section="company" />
          <InfoRow label="Work Location" field="workLocation" section="company" />
        </Paper>
      </Grid>
    </Grid>
  );
}