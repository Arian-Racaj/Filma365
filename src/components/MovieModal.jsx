import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function MovieModal({ movie, onClose }) {
  const { isAuthenticated } = useAuth0();
  const [isWatching, setIsWatching] = useState(false);
  const [streamingOptions, setStreamingOptions] = useState([]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Set streaming options with MyFlixer as primary option
  useEffect(() => {
    if (movie) {
      const options = [
        {
          name: "Netflix",
          available: Math.random() > 0.5,
          url: "#",
          primary: true,
        },
        { name: "Amazon Prime", available: Math.random() > 0.5, url: "#" },
        { name: "Hulu", available: Math.random() > 0.5, url: "#" },
        { name: "Disney+", available: Math.random() > 0.5, url: "#" },
        { name: "HBO Max", available: Math.random() > 0.5, url: "#" },
      ];
      setStreamingOptions(options);
    }
  }, [movie]);

  const handleWatchClick = () => {
    setIsWatching(true);
  };

  const handleStreamingClick = (platform) => {
    // Redirect to a safer streaming platform with the movie title as search query
    const searchQuery = encodeURIComponent(movie.Title);
    let streamingUrl;

    // Show a message with streaming options
    alert(
      `🎬 Watch "${movie.Title}" on ${platform.name}\n\nPlease visit ${platform.name} to watch this movie.\n\nAvailable platforms:\n• Netflix\n• Amazon Prime\n• Hulu\n• Disney+\n• HBO Max`
    );
  };

  const handleCloseWatching = () => {
    setIsWatching(false);
  };

  if (!movie) return null;

  if (isWatching) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          animation: "fadeIn 0.3s ease-out",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "20px",
            padding: "30px",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
            animation: "scaleIn 0.4s ease-out",
            position: "relative",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleCloseWatching}
            style={{
              position: "absolute",
              top: "15px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "18px",
              color: "white",
              transition: "all 0.3s ease",
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 107, 107, 0.8)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "scale(1)";
            }}
          >
            ✕
          </button>

          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                margin: "0 0 20px 0",
                fontSize: "24px",
                fontWeight: "700",
                color: "white",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              🎬 Watch {movie.Title}
            </h2>

            {/* Video Player Placeholder */}
            <div
              style={{
                width: "100%",
                height: "400px",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "80px",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                ▶️
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Video Player
              </div>
            </div>

            {/* Streaming Options */}
            <div style={{ marginTop: "20px" }}>
              <h3
                style={{
                  color: "white",
                  fontSize: "18px",
                  marginBottom: "15px",
                }}
              >
                Available on:
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {streamingOptions.map((platform, index) => (
                  <button
                    key={index}
                    onClick={() => handleStreamingClick(platform)}
                    style={{
                      background: platform.primary
                        ? "linear-gradient(45deg, #667eea, #764ba2)"
                        : platform.available
                        ? "linear-gradient(45deg, #ff6b6b, #4ecdc4)"
                        : "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      border: platform.primary
                        ? "2px solid rgba(255, 255, 255, 0.3)"
                        : "none",
                      padding: "10px 20px",
                      borderRadius: "25px",
                      cursor: platform.available ? "pointer" : "not-allowed",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      opacity: platform.available ? 1 : 0.5,
                      transform: platform.primary ? "scale(1.05)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (platform.available) {
                        e.target.style.transform = "scale(1.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = platform.primary
                        ? "scale(1.05)"
                        : "scale(1)";
                    }}
                    disabled={!platform.available}
                  >
                    {platform.primary ? "⭐ " : ""}
                    {platform.name}
                    {!platform.available && " (Not Available)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Watch Later Button */}
            <button
              onClick={() => {
                // Add to watch later list
                const watchLater = JSON.parse(
                  localStorage.getItem("watchLater") || "[]"
                );
                const movieWithTimestamp = {
                  ...movie,
                  addedAt: new Date().toISOString(),
                };
                const updatedWatchLater = [movieWithTimestamp, ...watchLater];
                localStorage.setItem(
                  "watchLater",
                  JSON.stringify(updatedWatchLater)
                );
                alert("Added to Watch Later list!");
              }}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "12px 24px",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                marginTop: "20px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "scale(1)";
              }}
            >
              📝 Add to Watch Later
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-out",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "20px",
          padding: "30px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          animation: "scaleIn 0.4s ease-out",
          position: "relative",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "18px",
            color: "white",
            transition: "all 0.3s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 107, 107, 0.8)";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)";
            e.target.style.transform = "scale(1)";
          }}
        >
          ✕
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              animation: "slideInUp 0.6s ease-out",
            }}
          >
            <h2
              style={{
                margin: "0 0 10px 0",
                fontSize: "28px",
                fontWeight: "700",
                color: "white",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {movie.Title}
            </h2>
            <p
              style={{
                margin: "0",
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: "500",
              }}
            >
              {movie.Year} • {movie.Runtime}
            </p>
          </div>

          {/* Watch Buttons */}
          <div
            style={{
              textAlign: "center",
              animation: "slideInUp 0.7s ease-out 0.1s both",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
            }}
          >
            {/* Primary Watch Button */}
            <button
              onClick={() => {
                // Show a message with streaming options
                alert(
                  `🎬 Watch "${movie.Title}"\n\nAvailable streaming platforms:\n• Netflix\n• Amazon Prime\n• Hulu\n• Disney+\n• HBO Max\n\nPlease visit your preferred streaming platform to watch this movie.`
                );
              }}
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                padding: "15px 40px",
                borderRadius: "30px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow =
                  "0 12px 35px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(102, 126, 234, 0.3)";
              }}
            >
              🎬 Watch Movie
            </button>

            {/* Secondary Watch Button */}
            <button
              onClick={handleWatchClick}
              style={{
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                color: "white",
                border: "none",
                padding: "12px 30px",
                borderRadius: "25px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 20px rgba(255, 107, 107, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px) scale(1.03)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(255, 107, 107, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px rgba(255, 107, 107, 0.3)";
              }}
            >
              📺 More Options
            </button>
          </div>

          {/* Content grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "25px",
              animation: "slideInUp 0.8s ease-out 0.2s both",
            }}
          >
            {/* Poster */}
            <div style={{ textAlign: "center" }}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450/667eea/ffffff?text=No+Image"
                }
                alt={movie.Title}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </div>

            {/* Details */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {movie.Rated && (
                <div
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    alignSelf: "flex-start",
                  }}
                >
                  {movie.Rated}
                </div>
              )}

              {movie.Genre && (
                <div>
                  <strong
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "16px",
                    }}
                  >
                    Zhanri:
                  </strong>
                  <p
                    style={{
                      margin: "5px 0",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {movie.Genre}
                  </p>
                </div>
              )}

              {movie.Director && (
                <div>
                  <strong
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "16px",
                    }}
                  >
                    Regjisori:
                  </strong>
                  <p
                    style={{
                      margin: "5px 0",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {movie.Director}
                  </p>
                </div>
              )}

              {movie.Actors && (
                <div>
                  <strong
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "16px",
                    }}
                  >
                    Aktorët:
                  </strong>
                  <p
                    style={{
                      margin: "5px 0",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {movie.Actors}
                  </p>
                </div>
              )}

              {movie.imdbRating && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <strong
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "16px",
                    }}
                  >
                    IMDB Rating:
                  </strong>
                  <div
                    style={{
                      background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                      color: "#000",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    ⭐ {movie.imdbRating}/10
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Plot */}
          {movie.Plot && (
            <div style={{ animation: "slideInUp 1s ease-out 0.4s both" }}>
              <strong
                style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "16px" }}
              >
                Përmbledhje:
              </strong>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: "1.6",
                  fontSize: "15px",
                }}
              >
                {movie.Plot}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
