// src/pages/ProfilePage.jsx
import React, { useState, useContext } from "react";
import { Tabs, Tab, Container } from "@mui/material";

import { AuthContext } from "../App"; // Adjust path if needed
import ProfileHeader from "../components/profile/ProfileHeader";
import OverviewTab from "../components/profile/OverviewTab";
import SettingsTab from "../components/profile/SettingsTab";
import AccountInfoTab from "../components/profile/AccountInfoTab";
import EditDialog from "../components/profile/EditDialog";

export default function ProfilePage() {
  // Use global user from AuthContext
  const { user, updateUser } = useContext(AuthContext);

  // Fallback if user not loaded yet (optional, improves UX)
  const currentUser = user || {
    fullName: "Loading...",
    role: "Inventory Manager",
    email: "",
    phone: "",
    location: "",
    joined: "",
  };

  const [tab, setTab] = useState(0);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProfileHeader user={currentUser} onEdit={() => setEditOpen(true)} />

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Account Information" />
        <Tab label="Settings" />
      </Tabs>

      {tab === 0 && <OverviewTab user={currentUser} />}
      {tab === 1 && <AccountInfoTab />}           {/* No props needed */}
      {tab === 2 && <SettingsTab />}

      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={currentUser}
        onSave={updateUser}   // This comes directly from AuthContext
      />
    </Container>
  );
}