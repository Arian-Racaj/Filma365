import React, { useState } from "react";

function SearchBar({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
        animation: "slideInUp 0.6s ease-out",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Kërko për filma..."
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: "100%",
            padding: "16px 20px",
            fontSize: "16px",
            borderRadius: "25px",
            border: "2px solid transparent",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "white",
            outline: "none",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: isFocused
              ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.3)"
              : "0 4px 16px rgba(0, 0, 0, 0.2)",
            transform: isFocused ? "scale(1.02)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "18px",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        >
          🎬
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
