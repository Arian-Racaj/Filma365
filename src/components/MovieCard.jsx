import React, { useState } from "react";

function MovieCard({ movie, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/200x300/667eea/ffffff?text=No+Image";
    setImageLoaded(true);
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        padding: "15px",
        width: "220px",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered
          ? "translateY(-8px) scale(1.05)"
          : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.3)"
          : "0 8px 25px rgba(0, 0, 0, 0.2)",
        animation: "scaleIn 0.6s ease-out",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(movie.imdbID)}
    >
      {/* Glow effect on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isHovered
            ? "linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1))"
            : "transparent",
          borderRadius: "16px",
          transition: "all 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Image container */}
      <div
        style={{
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "12px",
          background: "rgba(0, 0, 0, 0.2)",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!imageLoaded && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "pulse 1.5s ease-in-out infinite",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "24px",
            }}
          >
            🎬
          </div>
        )}
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/200x300/667eea/ffffff?text=No+Image"
          }
          alt={movie.Title}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            opacity: imageLoaded ? 1 : 0,
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      {/* Content */}
      <div
        style={{
          textAlign: "center",
          animation: "slideInUp 0.8s ease-out 0.2s both",
        }}
      >
        <h3
          style={{
            margin: "0 0 8px 0",
            fontSize: "16px",
            fontWeight: "600",
            color: "white",
            lineHeight: "1.3",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {movie.Title}
        </h3>
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.8)",
            fontWeight: "500",
            background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {movie.Year}
        </p>
      </div>

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          borderRadius: "16px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            textAlign: "center",
            transform: isHovered ? "scale(1)" : "scale(0.8)",
            transition: "transform 0.3s ease",
          }}
        >
          👁️ Shiko Detajet
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
