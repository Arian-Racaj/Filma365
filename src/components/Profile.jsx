import React, { useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // profile, favorites, history, watchLater
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setActiveTab("profile");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setActiveTab("profile");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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

  const renderProfileDetails = () => (
    <div>
      {/* Profile Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        {user?.picture && (
          <img
            src={user.picture}
            alt={user.name}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "3px solid rgba(255, 255, 255, 0.3)",
              objectFit: "cover",
              marginBottom: "12px",
            }}
          />
        )}
        <div
          style={{
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "4px",
          }}
        >
          {user?.name}
        </div>
        <div style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px" }}>
          {user?.email}
        </div>
      </div>

      {/* User Details */}
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "11px",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Account Details
          </div>
          <div
            style={{ color: "white", fontSize: "13px", marginBottom: "8px" }}
          >
            <strong>Email:</strong> {user?.email}
          </div>
          <div
            style={{ color: "white", fontSize: "13px", marginBottom: "8px" }}
          >
            <strong>Name:</strong> {user?.name}
          </div>
          {user?.nickname && (
            <div
              style={{ color: "white", fontSize: "13px", marginBottom: "8px" }}
            >
              <strong>Nickname:</strong> {user.nickname}
            </div>
          )}
          {user?.email_verified && (
            <div
              style={{
                color: "#4CAF50",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>✓</span> Email Verified
            </div>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "11px",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Account Stats
          </div>
          <div
            style={{ color: "white", fontSize: "13px", marginBottom: "4px" }}
          >
            <strong>Member since:</strong>{" "}
            {user?.updated_at
              ? new Date(user.updated_at).toLocaleDateString()
              : "N/A"}
          </div>
          <div
            style={{ color: "white", fontSize: "13px", marginBottom: "4px" }}
          >
            <strong>Last login:</strong>{" "}
            {user?.updated_at
              ? new Date(user.updated_at).toLocaleString()
              : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    return (
      <div style={{ padding: "16px" }}>
        <div
          style={{
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "12px",
          }}
        >
          ❤️ My Favorites ({favorites.length})
        </div>
        {favorites.length === 0 ? (
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "13px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            No favorite movies yet. Start adding movies to your favorites!
          </div>
        ) : (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {favorites.map((movie) => (
              <div
                key={movie.imdbID}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.05)";
                }}
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/40x60/667eea/ffffff?text=No+Image"
                  }
                  alt={movie.Title}
                  style={{
                    width: "40px",
                    height: "60px",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {movie.Title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "10px",
                    }}
                  >
                    {movie.Year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderWatchHistory = () => {
    const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");

    return (
      <div style={{ padding: "16px" }}>
        <div
          style={{
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "12px",
          }}
        >
          📺 Watch History ({history.length})
        </div>
        {history.length === 0 ? (
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "13px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            No watch history yet. Start watching movies to see your history!
          </div>
        ) : (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {history.map((movie, index) => (
              <div
                key={`${movie.imdbID}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.05)";
                }}
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/40x60/667eea/ffffff?text=No+Image"
                  }
                  alt={movie.Title}
                  style={{
                    width: "40px",
                    height: "60px",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {movie.Title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "10px",
                    }}
                  >
                    {movie.Year} •{" "}
                    {movie.watchedAt
                      ? new Date(movie.watchedAt).toLocaleDateString()
                      : "Unknown"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderWatchLater = () => {
    const watchLater = JSON.parse(localStorage.getItem("watchLater") || "[]");

    return (
      <div style={{ padding: "16px" }}>
        <div
          style={{
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "12px",
          }}
        >
          📝 Watch Later ({watchLater.length})
        </div>
        {watchLater.length === 0 ? (
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "13px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            No movies in your watch later list. Add movies to watch later!
          </div>
        ) : (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {watchLater.map((movie, index) => (
              <div
                key={`${movie.imdbID}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.05)";
                }}
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/40x60/667eea/ffffff?text=No+Image"
                  }
                  alt={movie.Title}
                  style={{
                    width: "40px",
                    height: "60px",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {movie.Title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "10px",
                    }}
                  >
                    {movie.Year} •{" "}
                    {movie.addedAt
                      ? new Date(movie.addedAt).toLocaleDateString()
                      : "Unknown"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    isAuthenticated && (
      <div ref={dropdownRef} style={{ position: "relative" }}>
        {/* Profile Button */}
        <div
          onClick={handleProfileClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255, 255, 255, 0.1)",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "translateY(0)";
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
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "12px",
              transition: "transform 0.3s ease",
              transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </div>
        </div>

                 {/* Dropdown Menu */}
         {isDropdownOpen && (
           <div
             style={{
               position: "absolute",
               top: "100%",
               right: 0,
               marginTop: "8px",
               background: "rgba(20, 20, 20, 0.95)",
               backdropFilter: "blur(15px)",
               border: "1px solid rgba(255, 255, 255, 0.2)",
               borderRadius: "12px",
               minWidth: "280px",
               maxWidth: "320px",
               maxHeight: "400px",
               overflow: "hidden",
               boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
               zIndex: 1000,
               animation: "slideDown 0.3s ease-out",
               // Fallback positioning to ensure visibility
               transform: "translateY(0)",
             }}
           >
            {/* Tab Navigation */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <div
                onClick={() => handleTabChange("profile")}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  color:
                    activeTab === "profile"
                      ? "white"
                      : "rgba(255, 255, 255, 0.7)",
                  fontSize: "13px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderBottom:
                    activeTab === "profile" ? "2px solid #667eea" : "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "profile") {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "profile") {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                👤 Profile
              </div>
              <div
                onClick={() => handleTabChange("favorites")}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  color:
                    activeTab === "favorites"
                      ? "white"
                      : "rgba(255, 255, 255, 0.7)",
                  fontSize: "13px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderBottom:
                    activeTab === "favorites" ? "2px solid #667eea" : "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "favorites") {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "favorites") {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                ❤️ Favorites
              </div>
              <div
                onClick={() => handleTabChange("history")}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  color:
                    activeTab === "history"
                      ? "white"
                      : "rgba(255, 255, 255, 0.7)",
                  fontSize: "13px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderBottom:
                    activeTab === "history" ? "2px solid #667eea" : "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "history") {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "history") {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                📺 History
              </div>
              <div
                onClick={() => handleTabChange("watchLater")}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  color:
                    activeTab === "watchLater"
                      ? "white"
                      : "rgba(255, 255, 255, 0.7)",
                  fontSize: "13px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderBottom:
                    activeTab === "watchLater" ? "2px solid #667eea" : "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "watchLater") {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "watchLater") {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                📝 Watch Later
              </div>
            </div>

                         {/* Tab Content */}
             <div style={{ maxHeight: "250px", overflowY: "auto" }}>
               {activeTab === "profile" && renderProfileDetails()}
               {activeTab === "favorites" && renderFavorites()}
               {activeTab === "history" && renderWatchHistory()}
               {activeTab === "watchLater" && renderWatchLater()}
             </div>

            {/* Logout Button */}
            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "12px 16px",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <div
                onClick={handleLogout}
                style={{
                  color: "#ff6b6b",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 107, 107, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span>🚪</span>
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
