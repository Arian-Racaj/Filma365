import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function MovieCard({ movie, onClick }) {
  const { isAuthenticated } = useAuth0();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if movie is in favorites on component mount
  useEffect(() => {
    if (isAuthenticated) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.some((fav) => fav.imdbID === movie.imdbID));
    }
  }, [movie.imdbID, isAuthenticated]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/200x300/667eea/ffffff?text=No+Image";
    setImageLoaded(true);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click

    if (!isAuthenticated) {
      alert("Please log in to add favorites!");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(
        (fav) => fav.imdbID !== movie.imdbID
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  const handleCardClick = () => {
    // Add to watch history
    if (isAuthenticated) {
      const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
      const movieWithTimestamp = {
        ...movie,
        watchedAt: new Date().toISOString(),
      };

      // Remove if already exists and add to beginning
      const filteredHistory = history.filter(
        (item) => item.imdbID !== movie.imdbID
      );
      const updatedHistory = [movieWithTimestamp, ...filteredHistory].slice(
        0,
        50
      ); // Keep last 50
      localStorage.setItem("watchHistory", JSON.stringify(updatedHistory));
    }

    onClick(movie.imdbID);
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
      onClick={handleCardClick}
    >
      {/* Favorite Button */}
      <div
        onClick={handleFavoriteClick}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          background: isAuthenticated
            ? isFavorite
              ? "rgba(255, 107, 107, 0.9)"
              : "rgba(0, 0, 0, 0.7)"
            : "rgba(0, 0, 0, 0.7)",
          color:
            isAuthenticated && isFavorite
              ? "white"
              : "rgba(255, 255, 255, 0.8)",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          fontSize: "14px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        onMouseEnter={(e) => {
          if (isAuthenticated) {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.background = isFavorite
              ? "rgba(255, 107, 107, 1)"
              : "rgba(255, 107, 107, 0.8)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = isAuthenticated
            ? isFavorite
              ? "rgba(255, 107, 107, 0.9)"
              : "rgba(0, 0, 0, 0.7)"
            : "rgba(0, 0, 0, 0.7)";
        }}
        title={
          isAuthenticated
            ? isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
            : "Login to add favorites"
        }
      >
        {isAuthenticated ? (isFavorite ? "❤️" : "🤍") : "🔒"}
      </div>

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
