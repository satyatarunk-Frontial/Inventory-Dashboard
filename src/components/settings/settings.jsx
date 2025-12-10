import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsTheme() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [boxShadowColor, setBoxShadowColor] = useState("rgba(0, 0, 0, 0.08)");
  const [borderColor, setBorderColor] = useState("#e2e8f0");

  const presetThemes = {
    light: { bg: "#ffffff", shadow: "rgba(0, 0, 0, 0.08)", border: "#e2e8f0" },
    slate: {
      bg: "#f8fafc",
      shadow: "rgba(15, 23, 42, 0.06)",
      border: "#cbd5e1",
    },
    indigo: {
      bg: "#eef2ff",
      shadow: "rgba(79, 70, 229, 0.12)",
      border: "#6366f1",
    },
    emerald: {
      bg: "#ecfdf5",
      shadow: "rgba(16, 185, 129, 0.12)",
      border: "#10b981",
    },
    rose: {
      bg: "#fdf2f8",
      shadow: "rgba(190, 24, 93, 0.12)",
      border: "#ec4899",
    },
    amber: {
      bg: "#fffbeb",
      shadow: "rgba(245, 158, 11, 0.12)",
      border: "#f59e0b",
    },
  };

  const applyPreset = (theme) => {
    setBgColor(presetThemes[theme].bg);
    setBoxShadowColor(presetThemes[theme].shadow);
    setBorderColor(presetThemes[theme].border);
  };

  const handleUpdate = () => {
    const updatedTheme = {
      page_bg: bgColor,
      shadow: boxShadowColor,
      border_color: borderColor,
      card_bg: "#ffffff",
      text_primary: "#1e293b",
    };
    localStorage.setItem("customFullTheme", JSON.stringify(updatedTheme));
    window.dispatchEvent(new Event("themeUpdated"));
    toast.success("Theme applied successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: "light",
    });
  };

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "auto",
        padding: "32px",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "20px",
        border: "1px solid rgba(226, 232, 240, 0.4)",
        boxShadow:
          "0 20px 40px -12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.05)",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        overflow: "hidden", // Prevent horizontal overflow
        maxHeight: "100vh", // Prevent height overflow
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#0f172a",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          Theme Customization
        </h2>
        <p style={{ color: "#64748b", marginTop: "8px", fontSize: "15px" }}>
          Choose a preset or fine-tune colors for your perfect brand look
        </p>
      </div>

      {/* Rest of your content (unchanged) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
          overflow: "hidden",
        }}
      >
        {Object.keys(presetThemes).map((key) => {
          const theme = presetThemes[key];
          return (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              style={{
                padding: "20px 16px",
                borderRadius: "16px",
                border: "2px solid transparent",
                background: theme.bg,
                boxShadow: `0 4px 12px ${theme.shadow}`,
                cursor: "pointer",
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden",
                fontWeight: 600,
                textTransform: "capitalize",
                color:
                  key === "light" || key === "slate" ? "#1e293b" : theme.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 24px ${theme.shadow}`;
                e.currentTarget.style.borderColor = theme.border;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 12px ${theme.shadow}`;
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 12,
                  height: 12,
                  background: theme.border,
                  borderRadius: "50%",
                  opacity: 0.8,
                }}
              />
              {key === "light"
                ? "Default Light"
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          );
        })}
      </div>

      {/* <div style={{ marginBottom: "32px", display: "grid", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <label
            style={{ minWidth: "120px", fontWeight: 500, color: "#475569" }}
          >
            Background
          </label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{
              width: "60px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          />
          <span style={{ fontFamily: "monospace", color: "#64748b" }}>
            {bgColor}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <label
            style={{ minWidth: "120px", fontWeight: 500, color: "#475569" }}
          >
            Accent Color
          </label>
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            style={{
              width: "60px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          />
          <span style={{ fontFamily: "monospace", color: "#64748b" }}>
            {borderColor}
          </span>
        </div>
      </div> */}

      <button
        onClick={handleUpdate}
        style={{
          width: "100%",
          padding: "14px 0",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-2px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        Apply Theme 
      </button>
    </div>
  );
}
