import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button 
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      style={{
        background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 8px 25px rgba(255, 107, 107, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "none";
      }}
    >
      Dil
    </button>
  );
};

export default LogoutButton;
