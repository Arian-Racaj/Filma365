import React, { useEffect } from "react";

function MovieModal({ movie, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!movie) return null;

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
