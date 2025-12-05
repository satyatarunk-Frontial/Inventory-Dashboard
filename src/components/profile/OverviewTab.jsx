// src/components/profile/OverviewTab.jsx
import React from "react";
import { Grid, Paper, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ShoppingCart, Package, TrendingUp, Activity } from "lucide-react";

const StatCard = ({ icon, label, value, color }) => (
  <Paper sx={{ p: 3, borderRadius: 3, textAlign: "center", bgcolor: "#fff" }}>
    {React.cloneElement(icon, { size: 28, color })}
    <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>{value}</Typography>
    <Typography color="text.secondary">{label}</Typography>
  </Paper>
);

const activities = [
  { icon: <Package color="#4CAF50" />, text: "Updated stock levels for Product SKU-12345", time: "2 hours ago" },
  { icon: <ShoppingCart color="#2196F3" />, text: "Processed order #ORD-9876", time: "5 hours ago" },
  { icon: <TrendingUp color="#FF9800" />, text: "Added new product category: Electronics", time: "1 day ago" },
  { icon: <Activity color="#4CAF50" />, text: "Generated monthly inventory report", time: "2 days ago" },
  { icon: <ShoppingCart color="#2196F3" />, text: "Approved purchase order #PO-5432", time: "3 days ago" },
  { icon: <TrendingUp color="#FF9800" />, text: "Updated supplier information for Vendor-ABC", time: "4 days ago" },
];

export default function OverviewTab({ user }) {
  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<ShoppingCart />} label="Total Orders" value={user?.totalOrders || 1248} color="#9C27B0" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<Package />} label="Items Managed" value={user?.itemsManaged || 3567} color="#4CAF50" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<TrendingUp />} label="Orders This Month" value={user?.ordersThisMonth || 156} color="#9C27B0" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<Activity />} label="Active Inventory" value={user?.activeInventory || 2890} color="#FF9800" />
        </Grid>
      </Grid>

      <Paper sx={{ borderRadius: 3, p: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Activity size={20} /> Recent Activity
        </Typography>
        <List>
          {activities.map((a, i) => (
            <ListItem key={i} divider={i < activities.length - 1}>
              <ListItemIcon>{a.icon}</ListItemIcon>
              <ListItemText primary={a.text} secondary={a.time} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}