// src/pages/ProfilePage.jsx
import React, { useState, useContext, useEffect } from "react";
import { Tabs, Tab, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { AuthContext } from "../App";
import ProfileHeader from "../components/profile/ProfileHeader";
import OverviewTab from "../components/profile/OverviewTab";
import SettingsTab from "../components/profile/SettingsTab";
import AccountInfoTab from "../components/profile/AccountInfoTab";
import EditDialog from "../components/profile/EditDialog";
import UserAccessTab from "../components/profile/UserAccessTab";

export default function ProfilePage() {
  const { user, updateUser } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentUser = user || {
    fullName: "Loading...",
    role: "Inventory Manager",
    email: "",
    phone: "",
    location: "",
    joined: "",
  };

  const tabParam = searchParams.get("tab");
  const initialTab = () => {
    switch (tabParam) {
      case "account-information": return 1;
      case "settings": return 2;
      case "user-access": return 3;
      default: return 0;
    }
  };

  const [tab, setTab] = useState(initialTab);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setTab(initialTab());
  }, [tabParam]);

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    const tabNames = ["overview", "account-information", "settings", "user-access"];
    setSearchParams({ tab: tabNames[newValue] });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProfileHeader user={currentUser} onEdit={() => setEditOpen(true)} />

      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Account Information" />
        <Tab label="Settings" />
        <Tab label="User Access" />
      </Tabs>

      {tab === 0 && <OverviewTab user={currentUser} />}
      {tab === 1 && <AccountInfoTab />}
      {tab === 2 && <SettingsTab />}
      {tab === 3 && <UserAccessTab />}

      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={currentUser}
        onSave={updateUser}
      />
    </Container>
  );
}