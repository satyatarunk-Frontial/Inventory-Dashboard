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
  
  Home,
  Layers,
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
export const SIDEBAR_WIDTH = 230;
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

const DEFAULT_COLORS = [
  "#FF8A80",
  "#FFD180",
  "#FFF59D",
  "#C8E6C9",
  "#B3E5FC",
  "#D1C4E9",
  "#F8BBD0",
];

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
    transition:
      "width 200ms cubic-bezier(.22,1,.36,1), background 200ms ease, box-shadow 200ms ease",
    padding: open
      ? `${NAVBAR_HEIGHT + 20}px 18px 84px` // extra bottom padding so bottom toggle isn't overlapped
      : `${NAVBAR_HEIGHT + 16}px 14px 84px`,
    overflow: "auto",
    pointerEvents: "auto",
    zIndex: 1300,
    willChange: "width, transform, opacity",
    "& .MuiList-root": { paddingTop: 0 },
    "&::-webkit-scrollbar": { width: 6 },
    "&::-webkit-scrollbar-thumb": {
      background: alpha(PALETTE.text, 0.12),
      borderRadius: 3,
    },
  })
);

const IconWrap = styled(Box, {
  shouldForwardProp: (p) => p !== "active" && p !== "small",
})(({ active, small }) => ({
  width: small ? 40 : 48,
  height: small ? 40 : 46,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: active ? PALETTE.activeBg : small ? "transparent" : "#fafafa",
  border: `1px solid ${active ? PALETTE.accent : PALETTE.border}`,
  color: active ? PALETTE.accent : PALETTE.text,
  transition: "all 180ms cubic-bezier(.22,1,.36,1)",
  willChange: "transform, box-shadow",
  boxShadow: active
    ? `0 6px 16px ${alpha(PALETTE.accent, 0.2)}`
    : "0 2px 8px rgba(8,24,48,0.05)",
}));

// Slightly smaller avatar so labels have more space and wrap less frequently
const CategoryAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  fontWeight: 700,
  fontSize: "0.88rem",
  border: "2px solid white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
}));

export default function SideBar({ initialOpen = true, onToggle }) {
  const [open, setOpen] = useState(initialOpen);
  const [activeKey, setActiveKey] = useState("home");
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const categories = useMemo(() => categoriesData || [], []);

  useEffect(() => onToggle?.(open), [open, onToggle]);

  // Toggle only via the bottom toggle button.
  const toggle = () => setOpen((v) => !v);

  // handle navigation / selection
  const handleItemClick = (key, href, hasSubmenu) => {
    setActiveKey(key);

    // Toggle submenu only when sidebar is open (because expanded submenu is a visible UI element).
    // If sidebar is closed and user clicks icon, we DON'T open the panel (per request).
    if (open && hasSubmenu) {
      setExpanded((p) => !p);
    } else if (!open && hasSubmenu) {
      // When closed and user clicks the categories icon, scroll to top so they can see the content,
      // but do not open the panel.
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Navigate if route present (clicking icons when closed should still navigate but not open).
    if (href) {
      navigate(href);
      // ensure top of page after navigation
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const menuItems = [
    { key: "home", label: "Home", icon: Home, href: "/" },
    { key: "categories", label: "Categories", icon: Layers, hasSubmenu: true },
    { key: "archive", label: "Archive", icon: Archive, href: "/archive" },
    { key: "discarded", label: "Discarded", icon: Trash2, href: "/discarded" },
    { key: "history", label: "History", icon: History, href: "/history" },
    { key: "promotions", label: "Promotions", icon: Tag, href: "/promotions" },
    { key: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <Root>
      <Panel open={open} aria-expanded={open}>
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
                    onClick={() => {
                      // Special behavior for Home: always go to route and scroll to top.
                      if (item.key === "home") {
                        navigate("/");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setActiveKey("home");
                        return;
                      }
                      handleItemClick(item.key, item.href, item.hasSubmenu);
                    }}
                    component="button"
                    sx={(theme) => ({
                      borderRadius: 3,
                      minHeight: 54,
                      minWidth: open ? 230 : 48,
                      py: 1,
                      px: open ? 2 : 1.5,
                      gap: open ? 3 : 0,
                      justifyContent: open ? "flex-start" : "center",
                      background: isActive ? PALETTE.activeBg : "transparent",
                      transition: "all 180ms cubic-bezier(.22,1,.36,1)",
                      willChange: "transform, background, opacity",
                      pr: open ? 2.5 : 1.5, // ensure there is right padding so chevron doesn't hit edge
                      ...(open
                        ? {
                            "&:hover": {
                              background: isActive
                                ? PALETTE.activeBg
                                : alpha(PALETTE.accent, 0.08),
                              transform: "translateX(2px)",
                            },
                          }
                        : {
                            "&:hover": {
                              background: "transparent",
                              transform: "none",
                            },
                          }),
                    })}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 55 : "auto",
                        color: isActive ? PALETTE.accent : "inherit",
                      }}
                    >
                      <IconWrap active={isActive} small={!open}>
                        <Icon size={22} strokeWidth={2.2} />
                      </IconWrap>
                    </ListItemIcon>

                    <Collapse in={open} orientation="horizontal" timeout={200}>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: 700,
                          fontSize: "0.98rem",
                          color: isActive ? PALETTE.accent : PALETTE.text,
                        }}
                      />
                    </Collapse>

                    {item.hasSubmenu && open && (
                      <ChevronDown
                        size={18}
                        style={{
                          marginLeft: "8px", // small margin so chevron not glued to edge
                          transform: isCategoriesOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 180ms",
                          willChange: "transform",
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>

                {item.hasSubmenu && (
                  // Submenu list is indented and appears directly under Categories.
                  <Collapse
                    in={open && isCategoriesOpen}
                    timeout={220}
                    unmountOnExit
                  >
                    <List disablePadding sx={{ pl: 1.25, pt: 1, pb: 1 }}>
                      {categories.map((cat, i) => {
                        const catColor =
                          cat?.color ??
                          cat?.hex ??
                          cat?.bg ??
                          DEFAULT_COLORS[i % DEFAULT_COLORS.length];
                        const slug = cat?.slug ?? `cat-${i}`;
                        const label = cat?.label ?? cat?.name ?? "Category";

                        return (
                          <ListItemButton
                            key={slug}
                            onClick={() => {
                              navigate(`/category/${slug}`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            component="button"
                            sx={{
                              borderRadius: 2.5,
                              py: 1.2,
                              my: 0.5,
                              pl: 2.5, // <<<<<< SHIFTED LEFT HERE
                              minHeight: 48,
                              transition: "transform 160ms, background 160ms",
                              willChange: "transform, background, box-shadow",
                              "&:hover": {
                                background: alpha(catColor, 0.12),
                                transform: "translateX(6px)",
                                boxShadow: `0 4px 12px ${alpha(
                                  catColor,
                                  0.12
                                )}`,
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <CategoryAvatar sx={{ bgcolor: catColor }}>
                                {label?.[0]?.toUpperCase() || "?"}
                              </CategoryAvatar>
                            </ListItemIcon>

                            <ListItemText
                              primary={label}
                              primaryTypographyProps={{
                                fontWeight: 600,
                                sx: {
                                  whiteSpace: "normal",
                                  overflowWrap: "break-word",
                                  maxWidth: "120px",
                                },
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>

        {/* bottom toggle - sticky and high zIndex so it doesn't get hidden by scroll/content */}
        <Box
          sx={{
            position: "sticky",
            bottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "flex-start" : "center",
            px: open ? 2 : 0,
            mt: 2,
            zIndex: 1400,
            pointerEvents: "auto",
            // add small translucent backdrop to ensure visibility over content if needed
            // backgroundColor: alpha("#fff", 0.001)
          }}
        >
          <Tooltip
            title={!open ? "Open sidebar" : "Close sidebar"}
            placement={!open ? "right" : "left"}
          >
            <IconButton
              onClick={toggle}
              size="large"
              aria-label={open ? "Close sidebar" : "Open sidebar"}
            >
              <IconWrap small={!open} active={false}>
                {open ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}
              </IconWrap>
            </IconButton>
          </Tooltip>

          <Collapse in={open} orientation="horizontal" timeout={200}>
            <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
              <Typography
                fontWeight={700}
                fontSize="0.95rem"
                color={PALETTE.text}
                sx={{ userSelect: "none" }}
              >
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
