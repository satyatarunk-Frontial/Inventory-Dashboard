import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ThemeCustomization() {
  const themes = {
    default: {
      name: "Default",
      page_bg: "#ffffff",
      card_bg: "#ffffff",
      text_primary: "#1e293b",
      shadow: "rgba(0, 0, 0, 0.08)",
      border_color: "#e2e8f0",
    },
    bright: {
      name: "Bright",
      page_bg: "#f0f9ff",
      card_bg: "#ffffff",
      text_primary: "#0c4a6e",
      shadow: "rgba(14, 165, 233, 0.15)",
      border_color: "#0ea5e9",
    },
    dark: {
      name: "Dark",
      page_bg: "#0f172a",
      card_bg: "#1e293b",
      text_primary: "#e2e8f0",
      shadow: "rgba(0, 0, 0, 0.3)",
      border_color: "#475569",
    },
  };

  const applyTheme = (themeKey) => {
    const theme = themes[themeKey];

    // Save to localStorage
    localStorage.setItem("customFullTheme", JSON.stringify(theme));

    // Trigger instant update across app
    window.dispatchEvent(new Event("themeUpdated"));

    // Nice toast feedback
    toast.success(`${theme.name} theme applied!`, {
      position: "top-center",
      autoClose: 1500,
      theme: themeKey === "dark" ? "dark" : "light",
    });
  };

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "auto",
        padding: "32px",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        border: "1px solid rgba(226, 232, 240, 0.4)",
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a" }}>
          Choose Your Theme
        </h2>
        <p style={{ color: "#64748b", marginTop: "8px" }}>
          Instantly switch between light, bright, and dark modes
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => applyTheme(key)}
            style={{
              padding: "24px 16px",
              borderRadius: "16px",
              border: "3px solid transparent",
              background: theme.page_bg,
              color: theme.text_primary,
              boxShadow: `0 8px 20px ${theme.shadow}`,
              cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              fontWeight: 600,
              fontSize: "16px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = theme.border_color;
              e.currentTarget.style.boxShadow = `0 16px 32px ${theme.shadow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.boxShadow = `0 8px 20px ${theme.shadow}`;
            }}
          >
            {/* Preview Card Inside */}
            <div
              style={{
                width: "100%",
                height: "60px",
                background: theme.card_bg,
                border: `1px solid ${theme.border_color}`,
                borderRadius: "12px",
                marginBottom: "12px",
                boxShadow: `0 2px 8px ${theme.shadow}`,
              }}
            />
            <div style={{ fontSize: "18px", fontWeight: 700 }}>
              {theme.name}
            </div>
            <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "4px" }}>
              {key === "default" && "Clean & minimal"}
              {key === "bright" && "Fresh & vibrant"}
              {key === "dark" && "Elegant dark mode"}
            </div>

            {/* Accent Dot */}
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 16,
                height: 16,
                background: theme.border_color,
                borderRadius: "50%",
              }}
            />
          </button>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: "24px", color: "#94a3b8", fontSize: "14px" }}>
        Changes apply instantly • No save button needed
      </p>
    </div>
  );
}