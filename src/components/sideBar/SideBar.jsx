import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Typography,
  Avatar,
  alpha,
} from "@mui/material";
import {
  Menu,
  Home,
  Layers,
  Box as BoxIcon,
  ArrowLeft,
  ArrowRight,
  Archive,
  Trash2,
  History,
  Tag,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import categoriesData from "../../data/productCards.json";

// Sizes
export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED = 72;
const NAVBAR_HEIGHT = 85;

const PALETTE = {
  bg: "#ffffff",
  rail: "linear-gradient(180deg, #fbfefe 0%, #f3f9f8 100%)",
  border: "rgba(10, 20, 30, 0.08)",
  text: "#0f2b2a",
  accent: "#0f9d8e",
  activeBg: "rgba(15, 157, 142, 0.12)",
};

const Root = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  zIndex: 1200,
  pointerEvents: "none",
}));

const Panel = styled(Box, { shouldForwardProp: (p) => p !== "open" })(
  ({ open, theme }) => ({
    position: "absolute",
    left: 0,
    top: 0,
    height: "100vh",
    width: open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED,
    background: open ? PALETTE.bg : PALETTE.rail,
    borderRight: `1px solid ${PALETTE.border}`,
    boxShadow: open ? "8px 0 32px rgba(8, 24, 48, 0.12)" : "none",
    transition: "width 280ms cubic-bezier(.22,1,.36,1), background 280ms",
    padding: open ? `${NAVBAR_HEIGHT + 20}px 18px 24px` : `${NAVBAR_HEIGHT + 16}px 14px 16px`,
    overflow: "auto",
    pointerEvents: "auto",
    zIndex: 1300,
    '& .MuiList-root': { paddingTop: 0 },
    '&::-webkit-scrollbar': { width: 6 },
    '&::-webkit-scrollbar-thumb': { background: alpha(PALETTE.text, 0.12), borderRadius: 3 },
  })
);

const IconWrap = styled(Box, { shouldForwardProp: (p) => p !== "active" && p !== "small" })(
  ({ active, small }) => ({
    width: small ? 44 : 52,
    height: small ? 44 : 52,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: active ? PALETTE.activeBg : small ? "transparent" : "#fafafa",
    border: `1px solid ${active ? PALETTE.accent : PALETTE.border}`,
    color: active ? PALETTE.accent : PALETTE.text,
    transition: "all 220ms ease",
    boxShadow: active ? `0 6px 16px ${alpha(PALETTE.accent, 0.2)}` : "0 2px 8px rgba(8,24,48,0.05)",
  })
);

const CategoryAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  fontWeight: 700,
  fontSize: "0.95rem",
  border: "2px solid white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
}));

export default function SideBar({ initialOpen = true, onToggle }) {
  const [open, setOpen] = useState(initialOpen);
  const [activeKey, setActiveKey] = useState("home");
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const categories = useMemo(() => categoriesData || [], []);
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#a29bfe", "#fd79a8", "#00b894"];

  useEffect(() => onToggle?.(open), [open, onToggle]);

  const toggle = () => setOpen((v) => !v);

  const handleItemClick = (key, href) => {
    setActiveKey(key);
    if (key === "categories") setExpanded((p) => !p);
    if (!open) setOpen(true);
    if (href) navigate(href);
  };

  const menuItems = [
    { key: "home", label: "Home", icon: Home, href: "/" },
    { key: "categories", label: "Categories", icon: Layers, hasSubmenu: true },
    { key: "archive", label: "Archive", icon: Archive },
    { key: "discarded", label: "Discarded", icon: Trash2 },
    { key: "history", label: "History", icon: History },
    { key: "promotions", label: "Promotions", icon: Tag },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <Root>
      <Panel open={open} aria-expanded={open}>
        {/* small top spacer so menu doesn't touch navbar */}
        <Box sx={{ height: 12 }} />

        <List disablePadding>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeKey === item.key;
            const isCategoriesOpen = item.key === "categories" && expanded;

            return (
              <Box key={item.key} sx={{ mb: 0.75 }}>
                <Tooltip title={!open ? item.label : ""} placement="right">
                  <ListItemButton
                    onClick={() => handleItemClick(item.key, item.href)}
                    component="button"
                    sx={(theme) => ({
                      borderRadius: 3,
                      minHeight: 56,
                      py: 1,
                      px: open ? 2 : 1.5,
                      gap: open ? 3 : 0,
                      justifyContent: open ? "flex-start" : "center",
                      background: isActive ? PALETTE.activeBg : "transparent",
                      transition: "all 220ms cubic-bezier(0.4, 0, 0.2, 1)",
                      ...(open
                        ? {
                            '&:hover': {
                              background: isActive ? PALETTE.activeBg : alpha(PALETTE.accent, 0.08),
                              transform: 'translateX(2px)',
                            },
                          }
                        : {
                            '&:hover': { background: 'transparent', transform: 'none' },
                          }),
                    })}
                  >
                    <ListItemIcon sx={{ minWidth: open ? 56 : "auto", color: isActive ? PALETTE.accent : "inherit" }}>
                      <IconWrap active={isActive} small={!open}>
                        <Icon size={22} strokeWidth={2.2} />
                      </IconWrap>
                    </ListItemIcon>

                    <Collapse in={open} orientation="horizontal" timeout={240}>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontWeight: 700, fontSize: "0.98rem", color: isActive ? PALETTE.accent : PALETTE.text }}
                      />
                    </Collapse>

                    {item.hasSubmenu && open && (
                      <ChevronDown
                        size={18}
                        style={{ marginLeft: "auto", transform: isCategoriesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 220ms" }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>

                {item.hasSubmenu && (
                  <Collapse in={open && isCategoriesOpen} timeout={360} unmountOnExit>
                    <List disablePadding sx={{ pl: 2, pt: 1, pb: 1 }}>
                      {categories.map((cat, i) => (
                        <ListItemButton
                          key={cat.slug}
                          onClick={() => navigate(`/category/${cat.slug}`)}
                          component="button"
                          sx={{
                            borderRadius: 2.5,
                            py: 1.2,
                            my: 0.5,
                            pl: 4.5,
                            minHeight: 48,
                            transition: "all 220ms",
                            '&:hover': { background: alpha(PALETTE.accent, 0.12), transform: "translateX(8px)", boxShadow: `0 4px 12px ${alpha(PALETTE.accent, 0.12)}` },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 44 }}>
                            <CategoryAvatar sx={{ bgcolor: colors[i % colors.length] }}>{cat.label[0].toUpperCase()}</CategoryAvatar>
                          </ListItemIcon>
                          <ListItemText primary={cat.label} primaryTypographyProps={{ fontWeight: 600 }} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>

        {/* bottom toggle */}
        <Box sx={{ position: "sticky", bottom: 20, display: "flex", alignItems: "center", justifyContent: open ? "flex-start" : "center", px: open ? 2 : 0, mt: 2 }}>
          <Tooltip title={!open ? "Open sidebar" : "Close sidebar"} placement={!open ? "right" : "left"}>
            <IconButton onClick={toggle} size="large" aria-label={open ? "Close sidebar" : "Open sidebar"}>
              <IconWrap small={!open} active={false}>{open ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}</IconWrap>
            </IconButton>
          </Tooltip>

          <Collapse in={open} orientation="horizontal" timeout={240}>
            <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
              <Typography fontWeight={700} fontSize="0.95rem" color={PALETTE.text} sx={{ userSelect: "none" }}>
                Close
              </Typography>
            </Box>
          </Collapse>
        </Box>
      </Panel>
    </Root>
  );
}

SideBar.propTypes = {
  initialOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};
