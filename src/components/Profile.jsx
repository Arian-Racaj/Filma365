import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderTop: "2px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        Duke ngarkuar...
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "12px 16px",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        {user?.picture && (
          <img
            src={user.picture}
            alt={user.name}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              objectFit: "cover",
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "1.2",
            }}
          >
            {user?.name}
          </h3>
          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "12px",
              lineHeight: "1.2",
            }}
          >
            {user?.email}
          </p>
        </div>
      </div>
    )
  );
};

export default Profile;
