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
} from "@mui/material";
import { Search, Headphones, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { AuthContext } from "../../App";
import CreateAgentDialog from "./CreateAgentDialog";

export default function UserAccessTab() {
  const { agents = [], addAgent, updateAgent, deleteAgent } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const filteredAgents = agents.filter((agent) =>
    agent.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuOpen = (event, agent) => {
    setAnchorEl(event.currentTarget);
    setSelectedAgent(agent);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAgent(null);
  };

  const handleEdit = () => {
    // You can open edit dialog with selectedAgent data here
    console.log("Edit agent:", selectedAgent);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${selectedAgent.fullName}?`)) {
      deleteAgent(selectedAgent.id);
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ bgcolor: "#006400", color: "white", p: 1.5, borderRadius: "50%" }}>
            <Headphones size={28} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Manage Agents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can create different types of Agents and easily manage existing ones from here
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>}
          onClick={() => setOpenCreate(true)}
          sx={{
            bgcolor: "#006400",
            "&:hover": { bgcolor: "#004d00" },
            borderRadius: 2,
            px: 3,
            py: 1.2,
            fontSize: "0.95rem",
          }}
        >
          Create Agent
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Chip
          label="All Agents"
          color="success"
          size="medium"
          sx={{ bgcolor: "#e8f5e8", color: "#006400", fontWeight: "bold", px: 2 }}
        />
      </Box>

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

      {/* Table with Actions */}
      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8f9fa" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Agent Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone No.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Created By</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Logged In</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6, color: "text.secondary" }}>
                  <Typography variant="h6">No agents found</Typography>
                  <Typography>Click "Create Agent" to get started</Typography>
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
                      sx={{ bgcolor: "#e3f2fd", color: "#1976d2", fontWeight: "medium" }}
                    />
                  </TableCell>
                  <TableCell color="text.secondary">{agent.lastLoggedIn || "Never"}</TableCell>
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { borderRadius: 2, boxShadow: 3 } }}
      >
        <MenuItem onClick={handleEdit}>
          <Edit2 size={16} style={{ marginRight: 12 }} />
          Edit Agent
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Trash2 size={16} style={{ marginRight: 12 }} />
          Delete Agent
        </MenuItem>
      </Menu>

      <CreateAgentDialog open={openCreate} onClose={() => setOpenCreate(false)} />
    </Box>
  );
}