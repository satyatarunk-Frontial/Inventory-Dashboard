// src/components/profile/UserAccessTab.jsx
import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, Headphones, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { AuthContext } from "../../App";
import CreateAgentDialog from "./CreateAgentDialog";

const roleFilters = [
  { label: "All Agents", value: "all" },
  { label: "Admin", value: "Admin" },
  { label: "Employee", value: "Employee" },
  { label: "Guest", value: "Guest" },
];

export default function UserAccessTab() {
  const { agents = [], deleteAgent } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [openCreate, setOpenCreate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const filteredAgents = agents
    .filter((agent) =>
      agent.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((agent) => roleFilter === "all" || agent.role === roleFilter);

  const handleMenuOpen = (e, agent) => {
    setAnchorEl(e.currentTarget);
    setSelectedAgent(agent);
  };

  const handleDelete = () => {
    deleteAgent(selectedAgent.id);
    setToast({
      open: true,
      message: `${selectedAgent.fullName} has been deleted`,
      severity: "success",
    });
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAgent(null);
  };

  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ bgcolor: "#006400", color: "white", p: 1.5, borderRadius: "50%" }}>
            <Headphones size={28} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">Manage Agents</Typography>
            <Typography variant="body2" color="text.secondary">
              You can create different types of Agents and easily manage existing ones from here
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>}
          onClick={() => setOpenCreate(true)}
          sx={{ bgcolor: "#006400", "&:hover": { bgcolor: "#004d00" }, borderRadius: 2, px: 3, py: 1.2 }}
        >
          Create Agent
        </Button>
      </Box>

      {/* Role Filter Chips */}
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {roleFilters.map((filter) => (
          <Chip
            key={filter.value}
            label={filter.label}
            onClick={() => setRoleFilter(filter.value)}
            color={roleFilter === filter.value ? "success" : "default"}
            variant={roleFilter === filter.value ? "filled" : "outlined"}
            sx={{
              fontWeight: roleFilter === filter.value ? "bold" : "normal",
              bgcolor: roleFilter === filter.value ? "#006400" : "transparent",
              color: roleFilter === filter.value ? "white" : "inherit",
            }}
          />
        ))}
      </Stack>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search Agents by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} color="#666" />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: 500, mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "white" } }}
        variant="outlined"
      />

      {/* Table */}
      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8f9fa" }}>
              {["Agent Name", "Phone No.", "Email", "Created By", "Role", "Last Logged In", ""].map((h) => (
                <TableCell key={h} sx={{ fontWeight: "bold", color: "#333" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6, color: "text.secondary" }}>
                  <Typography variant="h6">No agents found</Typography>
                  <Typography>Try changing the filter or search term</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredAgents.map((agent) => (
                <TableRow key={agent.id} hover>
                  <TableCell sx={{ fontWeight: "medium" }}>{agent.fullName}</TableCell>
                  <TableCell>{agent.phone}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.createdBy}</TableCell>
                  <TableCell>
                    <Chip
                      label={agent.role}
                      size="small"
                      sx={{
                        bgcolor: agent.role === "Admin" ? "#ffebee" : agent.role === "Employee" ? "#e8f5e8" : "#e3f2fd",
                        color: agent.role === "Admin" ? "#c62828" : agent.role === "Employee" ? "#2e7d32" : "#1976d2",
                        fontWeight: "medium",
                      }}
                    />
                  </TableCell>
                  <TableCell>{agent.lastLoggedIn || "Never"}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, agent)}>
                      <MoreVertical size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { /* Open Edit Dialog */ handleMenuClose(); }}>
          <Edit2 size={16} style={{ marginRight: 12 }} /> Edit Agent
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Trash2 size={16} style={{ marginRight: 12 }} /> Delete Agent
        </MenuItem>
      </Menu>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <CreateAgentDialog open={openCreate} onClose={() => setOpenCreate(false)} />
    </Box>
  );
}