// src/components/sidebar/SideBar.jsx
import React, { useEffect, useMemo, useState, useContext, useRef } from "react";
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
  Carrot,
  Drumstick,
  Soup,
  CookingPot,
  Utensils,
  Sprout,
  Gem,
  Cookie,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Global/ThemeContext";
import categoriesData from "../../data/productCards.json";

export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_COLLAPSED = 82;
const NAVBAR_HEIGHT = 85;

// Updated Green Theme (Modern & Clean)
const useSidebarPalette = (theme) => ({
  bg: theme.page_bg ?? "#ffffff",
  rail:
    theme.sidebar_rail ?? "linear-gradient(180deg, #f8fff8 0%, #f0fdf4 100%)",
  border: theme.border_color ?? "#e2e8f0",
  text: theme.text_primary ?? "#0f2b2a",
  accent: theme.primary ?? "#22c55e", // Beautiful Green
  activeBg: theme.active_bg ?? alpha("#22c55e", 0.12),
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
      "width 220ms cubic-bezier(0.22, 1, 0.36, 1), background 220ms ease",
    display: "flex",
    flexDirection: "column",
    pointerEvents: "auto",
    zIndex: 1300,
  })
);

const ScrollableContent = styled(Box)({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  padding: "18px 18px 20px",
  marginTop: NAVBAR_HEIGHT + 20,
  "&::-webkit-scrollbar": { width: 6 },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(34, 197, 94, 0.2)",
    borderRadius: 3,
  },
});

const BottomSection = styled(Box)(({ palette }) => ({
  position: "sticky",
  bottom: 0,
  background: palette.bg,
  borderTop: `1px solid ${palette.border}`,
  padding: "16px 18px",
  backdropFilter: "blur(10px)",
  zIndex: 10,
}));

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
  transition: "all 180ms ease",
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
  const theme = useContext(ThemeContext);
  const PALETTE = useSidebarPalette(theme);
  const categories = useMemo(() => categoriesData || [], []);

  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
  // ADD THIS ENTIRE BLOCK HERE (after the useState lines)
  const sidebarRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpen(false);
        onToggle?.(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onToggle]);

  // Close when pressing Escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        onToggle?.(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [open, onToggle]);
  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

  useEffect(() => onToggle?.(open), [open, onToggle]);

  const toggle = () => setOpen((v) => !v);

  const handleItemClick = (key, href, hasSubmenu) => {
    setActiveKey(key);

    if (open && hasSubmenu) {
      setExpanded((p) => !p);
    } else if (!open && hasSubmenu) {
      setOpen(true);
      setExpanded(true);
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

  const getCategoryIcon = (iconName, color) => {
    const iconProps = { size: 22, strokeWidth: 2.2, color: color };

    const lucideIcons = {
      carrot: <Carrot {...iconProps} />,
      drumstick: <Drumstick {...iconProps} />,
      soup: <Soup {...iconProps} />,
      cookingpot: <CookingPot {...iconProps} />,
      utensils: <Utensils {...iconProps} />,
      sprout: <Sprout {...iconProps} />,
      gem: <Gem {...iconProps} />,
      cookie: <Cookie {...iconProps} />,
      sparkles: <Sparkles {...iconProps} />,
    };

    return (
      lucideIcons[iconName] || <span style={{ fontSize: 24 }}>Package</span>
    );
  };

  return (
    <Root>
      <Panel ref={sidebarRef} open={open} palette={PALETTE}>
        <ScrollableContent>
          <List disablePadding>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey === item.key;
              const isCategoriesOpen = item.key === "categories" && expanded;

              return (
                <Box key={item.key} sx={{ mb: 0.5 }}>
                  <Tooltip title={!open ? item.label : ""} placement="right">
                    <ListItemButton
                      onClick={() =>
                        handleItemClick(item.key, item.href, item.hasSubmenu)
                      }
                      sx={{
                        borderRadius: 3,
                        minHeight: 50,
                        justifyContent: open ? "flex-start" : "center",
                        gap: open ? 3 : 0,
                        py: 1,
                        background: isActive ? PALETTE.activeBg : "transparent",
                        "&:hover": {
                          background: isActive
                            ? PALETTE.activeBg
                            : alpha(PALETTE.accent, 0.08),
                          transform: "translateX(3px)",
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
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexGrow: 1,
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontWeight: 600,
                              color: isActive ? PALETTE.accent : PALETTE.text,
                            }}
                          />

                          {item.hasSubmenu && (
                            <ChevronDown
                              size={20}
                              style={{
                                marginLeft: 12,
                                marginRight: 8,
                                transform: isCategoriesOpen
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 200ms ease",
                                opacity: 0.7,
                                flexShrink: 0,
                              }}
                            />
                          )}
                        </Box>
                      )}
                    </ListItemButton>
                  </Tooltip>

                  {item.hasSubmenu && (
                    <Collapse
                      in={open && isCategoriesOpen}
                      timeout={240}
                      unmountOnExit
                    >
                      <List disablePadding sx={{ pl: 1, pt: 1 }}>
                        {categories.map((cat, i) => {
                          const color =
                            cat.color ??
                            cat.hex ??
                            cat.bg ??
                            ["#22c55e", "#16a34a", "#4ade80", "#86efac"][i % 4];

                          return (
                            <ListItemButton
                              key={cat.slug}
                              onClick={() => {
                                navigate(`/category/${cat.slug}`);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              sx={{
                                borderRadius: 2.5,
                                py: 1,
                                my: 0.4,
                                pl: 5.5,
                                "&:hover": {
                                  background: alpha(color, 0.15),
                                  transform: "translateX(4px)",
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 56 }}>
                                <Box
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "12px",
                                    background: alpha(color, 0.12),
                                    border: `1px solid ${alpha(color, 0.3)}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {getCategoryIcon(cat.icon, color)}
                                </Box>
                              </ListItemIcon>
                              <ListItemText
                                primary={cat.label}
                                primaryTypographyProps={{
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                  ml: 1.5,
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
        </ScrollableContent>

        {/* Fixed Bottom Section - Always Visible */}
        <BottomSection palette={PALETTE}>
          <IconButton
            onClick={toggle}
            sx={{
              width: "100%",
              height: 56,
              borderRadius: 1,
              justifyContent: "center",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: open ? "flex-start" : "center",
                width: "100%",
                gap: 2,
                pl: open ? 1.5 : 0,
                pr: open ? 2 : 0,
              }}
            >
              <IconWrap small={!open} active={false} palette={PALETTE}>
                {open ? <ArrowLeft size={32} /> : <ArrowRight size={35} />}
              </IconWrap>

              {open && (
                <Typography
                  fontWeight={700}
                  fontSize="0.95rem"
                  color={PALETTE.text}
                  sx={{ ml: 1 }}
                >
                  Close
                </Typography>
              )}
            </Box>
          </IconButton>
        </BottomSection>
      </Panel>
    </Root>
  );
}

SideBar.propTypes = {
  initialOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};
