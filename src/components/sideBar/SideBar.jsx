// src/components/sidebar/SideBar.jsx
import React, { useEffect, useMemo, useState, useContext } from "react";
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
import { ThemeContext } from "../../Global/ThemeContext";
import categoriesData from "../../data/productCards.json";

export const SIDEBAR_WIDTH = 230;
export const SIDEBAR_COLLAPSED = 72;
const NAVBAR_HEIGHT = 85;

// ⭐ THEME-BASED SIDEBAR COLORS
const useSidebarPalette = (theme) => ({
  bg: theme.page_bg ?? "#ffffff",
  rail: theme.sidebar_rail ?? "linear-gradient(180deg, #fbfefe 0%, #f3f9f8 100%)",
  border: theme.border_color ?? "#e2e8f0",
  text: theme.text_primary ?? "#0f2b2a",
  accent: theme.primary ?? "#0fa3b1",
  activeBg: theme.active_bg ?? alpha(theme.primary ?? "#0fa3b1", 0.12),
  shadow: theme.shadow ?? "0px 4px 20px rgba(0,0,0,0.08)",
});

const Root = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  zIndex: 1200,
  pointerEvents: "none",
});

const Panel = styled(Box, { shouldForwardProp: (p) => p !== "open" })(
  ({ open, palette }) => ({
    position: "absolute",
    left: 0,
    top: 0,
    height: "100vh",
    width: open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED,
    background: open ? palette.bg : palette.rail,
    borderRight: `1px solid ${palette.border}`,
    boxShadow: open ? palette.shadow : "none",
    transition:
      "width 200ms cubic-bezier(.22,1,.36,1), background 200ms ease, box-shadow 200ms ease",
    padding: open
      ? `${NAVBAR_HEIGHT + 20}px 18px 84px`
      : `${NAVBAR_HEIGHT + 16}px 14px 84px`,
    overflow: "auto",
    pointerEvents: "auto",
    zIndex: 1300,
    "&::-webkit-scrollbar": { width: 6 },
    "&::-webkit-scrollbar-thumb": {
      background: alpha(palette.text, 0.12),
      borderRadius: 3,
    },
  })
);

const IconWrap = styled(Box, {
  shouldForwardProp: (p) => p !== "active" && p !== "small" && p !== "palette",
})(({ active, small, palette }) => ({
  width: small ? 40 : 48,
  height: small ? 40 : 46,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: active ? palette.activeBg : small ? "transparent" : "#f7fafc",
  border: `1px solid ${active ? palette.accent : palette.border}`,
  color: active ? palette.accent : palette.text,
  transition: "all 180ms cubic-bezier(.22,1,.36,1)",
  boxShadow: active
    ? `0 6px 16px ${alpha(palette.accent, 0.22)}`
    : "0 2px 8px rgba(8,24,48,0.05)",
}));

const CategoryAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  fontWeight: 700,
  fontSize: "0.88rem",
  border: "2px solid white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
});

export default function SideBar({ initialOpen = true, onToggle }) {
  const [open, setOpen] = useState(initialOpen);
  const [activeKey, setActiveKey] = useState("home");
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  // ⭐ Get theme from context
  const theme = useContext(ThemeContext);
  const PALETTE = useSidebarPalette(theme);

  const categories = useMemo(() => categoriesData || [], []);

  useEffect(() => onToggle?.(open), [open, onToggle]);

  const toggle = () => setOpen((v) => !v);

  const handleItemClick = (key, href, hasSubmenu) => {
    setActiveKey(key);

    if (open && hasSubmenu) {
      setExpanded((p) => !p);
    } else if (!open && hasSubmenu) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (href) {
      navigate(href);
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
      <Panel open={open} palette={PALETTE}>
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
                      if (item.key === "home") {
                        navigate("/");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setActiveKey("home");
                        return;
                      }
                      handleItemClick(item.key, item.href, item.hasSubmenu);
                    }}
                    sx={{
                      borderRadius: 3,
                      minHeight: 54,
                      justifyContent: open ? "flex-start" : "center",
                      gap: open ? 3 : 0,
                      background: isActive ? PALETTE.activeBg : "transparent",
                      "&:hover": {
                        background: isActive
                          ? PALETTE.activeBg
                          : alpha(PALETTE.accent, 0.08),
                        transform: "translateX(2px)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 55 : "auto",
                        color: isActive ? PALETTE.accent : PALETTE.text,
                      }}
                    >
                      <IconWrap
                        active={isActive}
                        small={!open}
                        palette={PALETTE}
                      >
                        <Icon size={22} strokeWidth={2.2} />
                      </IconWrap>
                    </ListItemIcon>

                    {open && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: 700,
                          color: isActive ? PALETTE.accent : PALETTE.text,
                        }}
                      />
                    )}

                    {item.hasSubmenu && open && (
                      <ChevronDown
                        size={18}
                        style={{
                          marginLeft: 8,
                          transform: isCategoriesOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "180ms",
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>

                {item.hasSubmenu && (
                  <Collapse
                    in={open && isCategoriesOpen}
                    timeout={200}
                    unmountOnExit
                  >
                    <List disablePadding sx={{ pl: 1.25, pt: 1, pb: 1 }}>
                      {categories.map((cat, i) => {
                        const color =
                          cat.color ??
                          cat.hex ??
                          cat.bg ??
                          ["#FF8A80", "#FFD180", "#FFF59D", "#C8E6C9"][i % 4];

                        return (
                          <ListItemButton
                            key={cat.slug}
                            onClick={() => {
                              navigate(`/category/${cat.slug}`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            sx={{
                              borderRadius: 2.5,
                              py: 1.2,
                              my: 0.5,
                              pl: 2.5,
                              "&:hover": {
                                background: alpha(color, 0.15),
                                transform: "translateX(5px)",
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <CategoryAvatar sx={{ bgcolor: color }}>
                                {cat.label[0].toUpperCase()}
                              </CategoryAvatar>
                            </ListItemIcon>

                            <ListItemText
                              primary={cat.label}
                              primaryTypographyProps={{
                                fontWeight: 600,
                                whiteSpace: "normal",
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

        {/* Toggle Button */}
        <Box
          sx={{
            position: "sticky",
            bottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "flex-start" : "center",
            px: open ? 2 : 0,
          }}
        >
          <Tooltip
            title={!open ? "Open Sidebar" : "Close Sidebar"}
            placement={!open ? "right" : "left"}
          >
            <IconButton onClick={toggle}>
              <IconWrap small={!open} active={false} palette={PALETTE}>
                {open ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}
              </IconWrap>
            </IconButton>
          </Tooltip>

          {open && (
            <Typography
              fontWeight={700}
              fontSize="0.95rem"
              color={PALETTE.text}
              sx={{ ml: 2 }}
            >
              Close
            </Typography>
          )}
        </Box>
      </Panel>
    </Root>
  );
}

SideBar.propTypes = {
  initialOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};
