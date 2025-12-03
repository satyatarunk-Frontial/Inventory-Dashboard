// src/components/graphs/GraphsHeader.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Package,
  Boxes,
  CircleDollarSign,
  Filter,
  BarChart3,
} from "lucide-react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Fade,
  Divider,
} from "@mui/material";

import {
  calculateStockValue,
  getTotalUnits,
  CATEGORY_KEYS,
  CATEGORY_LABELS,
  getAvailableDates,
  filterItemsByDateRange,
  getSalesTotals,
} from "./graphUtils";

/* Stat card (kept existing styling) */
function StatCard({ label, value, accent, Icon }) {
  const [hover, setHover] = useState(false);
  return (
    <Paper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 220,
        p: 2.5,
        borderRadius: 4,
        position: "relative",
        background: accent.background,
        transition: "0.25s ease",
        transform: hover ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hover ? "0 18px 28px rgba(0,0,0,0.16)" : "0 10px 20px rgba(0,0,0,0.10)",
        border: "1px solid rgba(255,255,255,0.6)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontSize: 12, color: accent.labelColor, fontWeight: 600, letterSpacing: ".05em" }}>
            {label}
          </Typography>
          <Typography sx={{ mt: 0.5, fontSize: 28, fontWeight: 800, color: accent.valueColor }}>
            {value}
          </Typography>
        </Box>
        <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: accent.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={accent.iconColor} strokeWidth={2.2} />
        </Box>
      </Box>
    </Paper>
  );
}

/**
 GraphsHeader
 Props:
  - allItems: full dataset
  - items: (optional) subset
*/
export default function GraphsHeader({ allItems = [], items = [] }) {
  // tmp editing state
  const [tmpCategory, setTmpCategory] = useState("all");
  const [tmpFrom, setTmpFrom] = useState("");
  const [tmpTo, setTmpTo] = useState("");
  const [tmpDate, setTmpDate] = useState("");
  const [mode, setMode] = useState("range");
  const [open, setOpen] = useState(false);

  // committed state (local display)
  const [committedCategory, setCommittedCategory] = useState("all");
  const [committedFrom, setCommittedFrom] = useState("");
  const [committedTo, setCommittedTo] = useState("");
  const [committedDate, setCommittedDate] = useState("");

  // available dates for input min/max (uses graphUtils)
  const availableDates = useMemo(() => getAvailableDates(allItems), [allItems]);
  const minAvailable = availableDates[0] || "";
  const maxAvailable = availableDates[availableDates.length - 1] || "";

  // trimmed items for header totals
  const headerTrimmedItems = useMemo(() => {
    const byCategory =
      committedCategory && committedCategory !== "all"
        ? allItems.filter((i) => i.category === committedCategory)
        : allItems;
    return filterItemsByDateRange(byCategory, { date: committedDate, from: committedFrom, to: committedTo });
  }, [allItems, committedCategory, committedDate, committedFrom, committedTo]);

  const { productsCount, totalUnits: salesUnits, totalRevenue } = useMemo(
    () => getSalesTotals(headerTrimmedItems),
    [headerTrimmedItems]
  );

  const invItems = committedCategory && committedCategory !== "all" ? allItems.filter((i) => i.category === committedCategory) : allItems;
  const invProducts = invItems.length;
  const invUnits = getTotalUnits(invItems);
  const invValue = calculateStockValue(invItems);

  const anyCommittedDate = Boolean(committedDate || committedFrom || committedTo);
  const displayProducts = anyCommittedDate ? productsCount : invProducts;
  const displayUnits = anyCommittedDate ? salesUnits : invUnits;
  const displayValue = anyCommittedDate ? totalRevenue : invValue;

  // Refs
  const popupRef = useRef(null);

  // Close popup when clicking outside both the popup and MUI menus (which are portal children)
  useEffect(() => {
    function handleDocMouseDown(e) {
      const popupEl = popupRef.current;
      const popoverEl = document.querySelector(".MuiPopover-root"); // MUI Popover (Select menu uses Popover)
      if (popupEl && popupEl.contains(e.target)) {
        // clicked inside popup or trigger — keep open
        return;
      }
      if (popoverEl && popoverEl.contains(e.target)) {
        // clicked inside the Select menu (portal) — keep open
        return;
      }
      // otherwise click is outside — close
      setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handleDocMouseDown);
      return () => document.removeEventListener("mousedown", handleDocMouseDown);
    }
    return undefined;
  }, [open]);

  // Apply: local only (do NOT notify parent)
  const applyToHeader = () => {
    setCommittedCategory(tmpCategory || "all");

    if (mode === "single") {
      setCommittedDate(tmpDate || "");
      setCommittedFrom("");
      setCommittedTo("");
    } else {
      setCommittedDate("");
      setCommittedFrom(tmpFrom || "");
      setCommittedTo(tmpTo || "");
    }

    setOpen(false);
  };

  // Reset both tmp and committed; local only
  const clearAll = () => {
    setTmpCategory("all");
    setTmpFrom("");
    setTmpTo("");
    setTmpDate("");
    setMode("range");

    setCommittedCategory("all");
    setCommittedFrom("");
    setCommittedTo("");
    setCommittedDate("");

    setOpen(false);
  };

  // const onModeChange = (e, newMode) => {
  //   if (!newMode) return;
  //   setMode(newMode);
  //   if (newMode === "single") {
  //     setTmpFrom("");
  //     setTmpTo("");
  //   } else {
  //     setTmpDate("");
  //   }
  // };

  // accents — left unchanged
  const accentProducts = { background: "linear-gradient(135deg, #E4ECFF 0%, #C3D4FF 40%, #9AB7FF 100%)", labelColor: "#2347C5", valueColor: "#0A1A3B", iconBg: "rgba(35,71,197,0.22)", iconColor: "#2347C5" };
  const accentUnits = { background: "linear-gradient(135deg, #D9FFE8 0%, #B9F5DA 40%, #9AE6C7 100%)", labelColor: "#0B815A", valueColor: "#073B2A", iconBg: "rgba(11,129,90,0.22)", iconColor: "#0B815A" };
  const accentValue = { background: "linear-gradient(135deg, #FFEBD6 0%, #FFD3A8 40%, #FFC48D 100%)", labelColor: "#C05621", valueColor: "#7A3410", iconBg: "rgba(192,86,33,0.22)", iconColor: "#C05621" };

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: 2.5,
          borderRadius: 4,
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.45)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
          gap: 2,
          zIndex: 50,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ width: 60, height: 60, borderRadius: 3, background: "linear-gradient(135deg, #4f46e5, #22c55e, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 18px rgba(0,0,0,0.2)" }}>
            <BarChart3 size={26} color="#fff" />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 30, fontWeight: 900, color: "#0f172a" }}>
              Stock Analytics Dashboard
            </Typography>
            <Typography sx={{ color: "#6b7280", fontSize: 14 }}>
              Track stock, sales and category performance in one clean view.
            </Typography>
          </Box>
        </Box>

        {/* Wrap button + popup together and use a ref + document click handler to manage closing */}
        <Box ref={popupRef} sx={{ display: "flex", alignItems: "center", marginLeft: "auto", position: "relative" }}>
          {/* Filter trigger - toggles header popup */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => setOpen((prev) => !prev)}
              variant="outlined"
              size="small"
              sx={{
                color: "gray",
                px: 2.5,
                py: 0.8,
                borderRadius: "999px",
                fontWeight: 700,
                background: "rgba(255,255,255,0.95)",
                borderColor: "rgba(200,200,200,0.8)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
              }}
              startIcon={<Filter size={16} />}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Typography fontWeight={700} sx={{ fontSize: 13 }}>
                Filter
              </Typography>
            </Button>
          </Box>

          {/* Popup (appears below button) */}
          <Fade in={open}>
            <Paper
              elevation={6}
              sx={{
                position: "absolute",
                right: 0,
                top: 45,
                width: 360,
                p: 2.5,
                borderRadius: 3,
                background: "white",
                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                border: "1px solid #e2e8f0",
                zIndex: 2000,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography sx={{ fontSize: 15, fontWeight: 800, mb: 2 }}>
                Header Filter
              </Typography>

              {/* Category selector */}
              <FormControl size="small" fullWidth sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 13, mb: 0.5 }}>Category</Typography>

                <Select
                  value={tmpCategory}
                  onChange={(e) => setTmpCategory(e.target.value)}
                  fullWidth
                  // Render the menu in a portal (default) so it won't be clipped by parent overflow.
                  MenuProps={{
                    disablePortal: false, // allow portal
                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                    transformOrigin: { vertical: "top", horizontal: "left" },
                    PaperProps: {
                      style: {
                        minWidth: 300,
                        zIndex: 3000, // ensure menu is above other UI
                      },
                      onMouseDown: (ev) => ev.stopPropagation(),
                    },
                    MenuListProps: { onMouseDown: (ev) => ev.stopPropagation() },
                  }}
                  sx={{
                    minWidth: 0,
                    width: "100%",
                    ".MuiSelect-select": { display: "flex", alignItems: "center" },
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {CATEGORY_KEYS.map((k) => (
                    <MenuItem key={k} value={k}>
                      {CATEGORY_LABELS[k]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Divider sx={{ my: 1 }} />

              {/* DATE RANGE (range only UI kept) */}
              <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 700 }}>Date Range</Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                  type="date"
                  label="From"
                  size="small"
                  value={tmpFrom || ""}
                  onChange={(e) => setTmpFrom(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={minAvailable ? { min: minAvailable } : {}}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    "& .MuiInputBase-input": {
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                    minWidth: 0,
                    '& input[type="date"]': { paddingRight: "8px" },
                  }}
                />

                <TextField
                  type="date"
                  label="To"
                  size="small"
                  value={tmpTo || ""}
                  onChange={(e) => setTmpTo(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={maxAvailable ? { max: maxAvailable } : {}}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    "& .MuiInputBase-input": {
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                    minWidth: 0,
                    '& input[type="date"]': { paddingRight: "8px" },
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button variant="outlined" onClick={() => { clearAll(); }} onMouseDown={(e) => e.stopPropagation()}>
                  Reset
                </Button>

                <Button variant="contained" onClick={() => { applyToHeader(); }} onMouseDown={(e) => e.stopPropagation()}>
                  Apply to header
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Box>
      </Paper>

      {/* Stat cards */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <StatCard label="Products" value={displayProducts} Icon={Package} accent={accentProducts} />
        <StatCard label="Total Units" value={displayUnits} Icon={Boxes} accent={accentUnits} />
        <StatCard label="Total Value" value={`₹ ${Number(displayValue || 0).toLocaleString("en-IN")}`} Icon={CircleDollarSign} accent={accentValue} />
      </Box>
    </Box>
  );
}
