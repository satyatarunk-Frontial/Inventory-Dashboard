// CategoryTrendGraph.jsx
import React, { useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  TextField,
  Fade,
  Chip,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  CATEGORY_KEYS,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  getCategorySalesTrend,
  filterItemsByDateRange,
  getAvailableDates,
} from "./graphUtils";

export default function CategoryTrendGraph({ items }) {
  const [selectedSet, setSelectedSet] = useState(new Set(CATEGORY_KEYS));
  const [range, setRange] = useState("all");
  const [customOpen, setCustomOpen] = useState(false);

  const [tmpFrom, setTmpFrom] = useState("");
  const [tmpTo, setTmpTo] = useState("");
  const [committedCustom, setCommittedCustom] = useState(null);

  const availableDates = useMemo(() => getAvailableDates(items || []), [items]);
  const minAvailable = availableDates[0] || "";
  const maxAvailable = availableDates[availableDates.length - 1] || "";

  const toggleCategory = (key) => {
    setSelectedSet((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const trimmedItems = useMemo(() => {
    if (range === "custom" && committedCustom) {
      if (committedCustom.mode === "single")
        return filterItemsByDateRange(items || [], { date: committedCustom.date });
      return filterItemsByDateRange(items || [], { from: committedCustom.from, to: committedCustom.to });
    }
    return items || [];
  }, [items, range, committedCustom]);

  const raw = useMemo(() => {
    try {
      return getCategorySalesTrend(trimmedItems || []);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("getCategorySalesTrend error:", e);
      return [];
    }
  }, [trimmedItems]);

  const displayedData = useMemo(() => {
    if (!Array.isArray(raw) || raw.length === 0) return [];

    if (range === "all") return raw;
    if (["7", "15", "30"].includes(range)) {
      const n = Number(range);
      return raw.length <= n ? raw : raw.slice(raw.length - n);
    }

    if (range === "custom" && committedCustom) {
      if (committedCustom.mode === "single" && committedCustom.date) {
        return raw.filter((r) => r.date === committedCustom.date);
      }
      if (committedCustom.mode === "range" && committedCustom.from && committedCustom.to) {
        const from = new Date(committedCustom.from);
        const to = new Date(committedCustom.to);
        if (isNaN(from.valueOf()) || isNaN(to.valueOf())) return [];
        return raw.filter((r) => {
          const d = new Date(r.date);
          return d >= from && d <= to;
        });
      }
    }

    return raw;
  }, [raw, range, committedCustom]);

  const applyCustomRange = () => {
    if (!tmpFrom || !tmpTo) return;
    if (tmpFrom > tmpTo) return;
    setCommittedCustom({ mode: "range", from: tmpFrom, to: tmpTo });
    setCustomOpen(false);
  };

  const cancelCustom = () => {
    setTmpFrom("");
    setTmpTo("");
    setCustomOpen(false);
  };

  // Toggle button appearance adjusted to match SalesLineGraph styling:
  // - rounded pills, subtle border, selected = filled accent color + bold text
  const toggleGroupSx = {
    display: "flex",
    gap: 1.25,
    "& .MuiToggleButton-root": {
      borderRadius: "12px",
      px: 2,
      py: 0.6,
      minWidth: 56,
      textTransform: "none",
      fontWeight: 700,
      fontSize: 13,
      border: "1px solid rgba(15,157,142,0.08)",
      background: "#fff",
      color: "rgba(15,20,20,0.85)",
      boxShadow: "none",
    },
    "& .MuiToggleButton-root:hover": {
      background: alpha("#0f9d8e", 0.04),
    },
    "& .MuiToggleButton-root.Mui-selected": {
      background: "#dff2ffff", // light accent fill
      color: "#4d5458ff",
      border: "1px solid rgba(15,157,142,0.18)",
      boxShadow: "inset 0 -2px 0 rgba(15,157,142,0.06)",
    },
  };

  if (!displayedData || displayedData.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, position: "relative" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          No category sales data for the selected filters
        </Typography>
        <Typography variant="body2">Try changing the date range or category selection.</Typography>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap", mt: 2 }}>
          <ToggleButtonGroup
            exclusive
            value={range}
            onChange={(_, v) => {
              if (!v) return;
              setRange(v);
              if (v === "custom") {
                setCustomOpen(true);
                setCommittedCustom(null);
              } else {
                setCustomOpen(false);
                setCommittedCustom(null);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            sx={toggleGroupSx}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="7">7d</ToggleButton>
            <ToggleButton value="15">15d</ToggleButton>
            <ToggleButton value="30">30d</ToggleButton>

            <ToggleButton
              value="custom"
              onClick={(e) => {
                e.stopPropagation();
                if (range === "custom") setCustomOpen((s) => !s);
              }}
            >
              <Calendar size={14} />
              &nbsp;Custom
            </ToggleButton>
          </ToggleButtonGroup>

          <Fade in={customOpen}>
            <Paper
              elevation={4}
              sx={{
                position: "absolute",
                right: 32,
                top: 90,
                p: 2.5,
                borderRadius: 3,
                width: 320,
                zIndex: 9999,
                pointerEvents: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1.5 }}>Select Date Range</Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  type="date"
                  label="From"
                  size="small"
                  value={tmpFrom}
                  onChange={(e) => setTmpFrom(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={
                    availableDates.length
                      ? { min: availableDates[0], max: availableDates[availableDates.length - 1] }
                      : {}
                  }
                  sx={{ flex: 1 }}
                />

                <TextField
                  type="date"
                  label="To"
                  size="small"
                  value={tmpTo}
                  onChange={(e) => setTmpTo(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={
                    availableDates.length
                      ? { min: availableDates[0], max: availableDates[availableDates.length - 1] }
                      : {}
                  }
                  sx={{ flex: 1 }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button variant="outlined" onClick={cancelCustom} onMouseDown={(e) => e.stopPropagation()}>
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={applyCustomRange}
                  disabled={
                    !(
                      tmpFrom &&
                      tmpTo &&
                      tmpFrom <= tmpTo &&
                      availableDates.length &&
                      tmpFrom >= minAvailable &&
                      tmpTo <= maxAvailable
                    )
                  }
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  Apply
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3.5, borderRadius: 4, position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center", flexWrap: "wrap", gap: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
            Multi-Category Sales Comparison
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: 13 }}>Compare trends across all product groups.</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap", marginLeft: "auto" }}>
          <ToggleButtonGroup
            exclusive
            value={range}
            onChange={(_, v) => {
              if (!v) return;
              setRange(v);
              if (v === "custom") {
                setCustomOpen(true);
                setCommittedCustom(null);
              } else {
                setCustomOpen(false);
                setCommittedCustom(null);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            sx={toggleGroupSx}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="7">7d</ToggleButton>
            <ToggleButton value="15">15d</ToggleButton>
            <ToggleButton value="30">30d</ToggleButton>
            <ToggleButton
              value="custom"
              onClick={(e) => {
                e.stopPropagation();
                if (range === "custom") setCustomOpen((s) => !s);
              }}
            >
              <Calendar size={16} />
              &nbsp;Custom
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        {CATEGORY_KEYS.map((key) => {
          const selected = selectedSet.has(key);
          const color = CATEGORY_COLORS[key] || "#999";
          return (
            <Chip
              key={key}
              clickable
              onClick={(e) => {
                e.stopPropagation();
                toggleCategory(key);
              }}
              label={CATEGORY_LABELS[key]}
              variant="filled"
              avatar={
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundColor: color,
                  }}
                />
              }
              sx={{
                borderRadius: "999px",
                px: 1.5,
                py: 0.25,
                backgroundColor: selected ? alpha(color, 0.10) : "#e5f3ff",
                color: selected ? color : "inherit",
                fontSize: 15,
                fontWeight: 600,
                "& .MuiChip-avatar": {
                  width: 10,
                  height: 10,
                  marginLeft: 0,
                  marginRight: 0.8,
                  borderRadius: "50%",
                  boxShadow: 1,
                  backgroundColor: color,
                },
              }}
            />
          );
        })}
      </Box>

      <Fade in={customOpen}>
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            right: 32,
            top: 90,
            p: 2.5,
            borderRadius: 3,
            width: 320,
            zIndex: 9999,
            pointerEvents: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1.5 }}>Select Date Range</Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              type="date"
              label="From"
              size="small"
              value={tmpFrom}
              onChange={(e) => setTmpFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={
                availableDates.length ? { min: availableDates[0], max: availableDates[availableDates.length - 1] } : {}
              }
              sx={{ flex: 1 }}
            />

            <TextField
              type="date"
              label="To"
              size="small"
              value={tmpTo}
              onChange={(e) => setTmpTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={
                availableDates.length ? { min: availableDates[0], max: availableDates[availableDates.length - 1] } : {}
              }
              sx={{ flex: 1 }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={cancelCustom} onMouseDown={(e) => e.stopPropagation()}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={applyCustomRange}
              disabled={
                !(
                  tmpFrom &&
                  tmpTo &&
                  tmpFrom <= tmpTo &&
                  availableDates.length &&
                  tmpFrom >= minAvailable &&
                  tmpTo <= maxAvailable
                )
              }
              onMouseDown={(e) => e.stopPropagation()}
            >
              Apply
            </Button>
          </Box>
        </Paper>
      </Fade>

      <Box sx={{ width: "100%", height: 360 }}>
        <ResponsiveContainer>
          <LineChart data={displayedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            {CATEGORY_KEYS.filter((k) => selectedSet.has(k)).map((key) => (
              <Line key={key} type="monotone" dataKey={key} name={CATEGORY_LABELS[key]} stroke={CATEGORY_COLORS[key]} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
