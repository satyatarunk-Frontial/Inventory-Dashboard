import React, { useState } from "react";

export default function SettingsTheme() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [boxShadowColor, setBoxShadowColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#000000");

  const handleUpdate = () => {
    const theme = {
      bgColor,
      boxShadowColor,
      borderColor,
    };

    localStorage.setItem("customTheme", JSON.stringify(theme));
    alert("Theme updated! Please reload and relogin to apply changes.");
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
        onMouseEnter={(e) => (e.target.style.background = "#0046c7")}
        onMouseLeave={(e) => (e.target.style.background = "#005eff")}
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
