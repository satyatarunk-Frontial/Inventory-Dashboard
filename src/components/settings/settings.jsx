import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsTheme() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [boxShadowColor, setBoxShadowColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#000000");

  // ⭐ Added white theme also
  const presetThemes = {
    white: {
      bg: "#ffffff",
      shadow: "rgba(0,0,0,0.05)",
      border: "#e5e7eb",
    },
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
  
  // ⭐ Apply theme instantly without page refresh
  const handleUpdate = () => {
    const updatedTheme = {
      page_bg: bgColor,
      shadow: boxShadowColor,
      border_color: borderColor,
      card_bg: "#ffffff",
      text_primary: "#0f172a",
    };

    // Save to localStorage
    localStorage.setItem("customFullTheme", JSON.stringify(updatedTheme));

    // ⭐ Dispatch event → Entire app updates instantly
    window.dispatchEvent(new Event("themeUpdated"));

    // ⭐ Toast instead of alert
    toast.success("Theme updated!", {
      position: "top-center",
      autoClose: 1200,
    });
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
        {["white", "blue", "green", "red", "purple", "orange"].map((t) => (
          <button
            key={t}
            onClick={() => applyPreset(t)}
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              color: t === "white" ? "#333" : "white",
              textTransform: "capitalize",
              width: "15.5%",
              background:
                t === "white"
                  ? "#ffffff"
                  : t === "blue"
                  ? "#005eff"
                  : t === "green"
                  ? "#16a34a"
                  : t === "red"
                  ? "#dc2626"
                  : t === "purple"
                  ? "#7e22ce"
                  : "#f97316",
              boxShadow:
                t === "white" ? "0 0 8px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {t}
          </button>
        ))}
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
    </div>
  );
}
