import React, { useState } from "react";

export default function SettingsTheme() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [boxShadowColor, setBoxShadowColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#000000");
  
  const presetThemes = {
    blue: {
      bg: "#e6f0ff",
      shadow: "#005eff55",
      border: "#005eff",
    },
    green: {
      bg: "#e7fbe7",
      shadow: "#16a34a55",
      border: "#16a34a",
    },
    red: {
      bg: "#ffe7e7",
      shadow: "#dc262655",
      border: "#dc2626",
    },
    purple: {
      bg: "#f3e8ff",
      shadow: "#7e22ce55",
      border: "#7e22ce",
    },
    orange: {
      bg: "#fff3e0",
      shadow: "#f9731655",
      border: "#f97316",
    },
  };

  const applyPreset = (theme) => {
    setBgColor(presetThemes[theme].bg);
    setBoxShadowColor(presetThemes[theme].shadow);
    setBorderColor(presetThemes[theme].border);
  };

 const handleUpdate = () => {
  const updatedTheme = {
    ...presetThemes.custom,
    page_bg: bgColor,
    shadow: boxShadowColor,
    border_color: borderColor,
  };

  localStorage.setItem(
    "customFullTheme",
    JSON.stringify(updatedTheme)
  );

  alert("Theme updated! Reload the page.");
};

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontWeight: 600,
          fontSize: "24px",
          color: "#333",
        }}
      >
        Brand Customization Theme
      </h2>

      {/* Preset Theme Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        {["blue", "green", "red", "purple", "orange"].map((t) => (
          <button
            key={t}
            onClick={() => applyPreset(t)}
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              color: "white",
              textTransform: "capitalize",
              width: "18%",
              background:
                t === "blue"
                  ? "#005eff"
                  : t === "green"
                  ? "#16a34a"
                  : t === "red"
                  ? "#dc2626"
                  : t === "purple"
                  ? "#7e22ce"
                  : "#f97316",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Background Color */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "15px", color: "#444", fontWeight: 500 }}>
          Background Color
        </label>

        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              border: "none",
              outline: "none",
            }}
          />

          <span style={{ fontSize: "14px", color: "#666" }}>{bgColor}</span>
        </div>
      </div>

      {/* Box Shadow Color */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "15px", color: "#444", fontWeight: 500 }}>
          Box Shadow Color
        </label>

        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <input
            type="color"
            value={boxShadowColor}
            onChange={(e) => setBoxShadowColor(e.target.value)}
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              border: "none",
              outline: "none",
            }}
          />

          <span style={{ fontSize: "14px", color: "#666" }}>
            {boxShadowColor}
          </span>
        </div>
      </div>

      {/* Border Color */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "15px", color: "#444", fontWeight: 500 }}>
          Border Color
        </label>

        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              border: "none",
              outline: "none",
            }}
          />

          <span style={{ fontSize: "14px", color: "#666" }}>{borderColor}</span>
        </div>
      </div>

      {/* Update Button */}
      <button
        onClick={handleUpdate}
        style={{
          width: "100%",
          marginTop: "25px",
          padding: "12px 0",
          background: "#005eff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          letterSpacing: "0.3px",
          transition: "0.2s",
        }}
      >
        Update Theme
      </button>

      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#888",
        }}
      >
        Please reload and relogin the site to see your themed changes.
      </p>
    </div>
  );
}
