import React, { useEffect, useRef, useState } from "react";

function BestFilmsCarousel({ movies, onMovieClick }) {
  const [carouselMovies, setCarouselMovies] = useState(movies);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  // Update carouselMovies when movies prop changes
  useEffect(() => {
    setCarouselMovies(movies);
  }, [movies]);

  // Auto-scroll effect with true sliding
  useEffect(() => {
    if (carouselMovies.length < 2) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
    }, 3000); // 3 seconds for faster rotation

    return () => clearInterval(interval);
  }, [carouselMovies]);

  // After animation, move first to end and reset transform
  useEffect(() => {
    if (!isAnimating) return;
    const ref = carouselRef.current;
    if (!ref) return;

    const handleTransitionEnd = () => {
      // Instantly reset transform and update array in the same frame
      ref.style.transition = "none";
      ref.style.transform = "translateX(0)";
      setCarouselMovies((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      // Force reflow to apply the style immediately
      void ref.offsetWidth;
      ref.style.transition = "transform 0.8s cubic-bezier(0.4,0,0.2,1)";
      setIsAnimating(false);
    };

    ref.addEventListener("transitionend", handleTransitionEnd, { once: true });
    ref.style.transform = "translateX(-200px)";

    return () => {
      ref.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isAnimating]);

  // Reset transform when carouselMovies changes (after shift)
  useEffect(() => {
    if (!isAnimating && carouselRef.current) {
      carouselRef.current.style.transform = "translateX(0)";
    }
  }, [carouselMovies, isAnimating]);

  return (
    <div
      style={{
        marginBottom: "40px",
        animation: "slideInUp 0.8s ease-out 0.2s both",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        🏆 Filmat Më të Mirë
      </h2>

      {/* Carousel Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "340px",
          overflow: "hidden",
        }}
      >
        {/* Carousel Track */}
        <div
          ref={carouselRef}
          style={{
            display: "flex",
            position: "absolute",
            left: "0",
            top: "0",
            transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
            gap: "20px",
          }}
        >
          {carouselMovies.map((movie, index) => (
            <div
              key={movie.imdbID + index}
              style={{
                width: "200px",
                height: "320px",
                flexShrink: 0,
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "16px",
                  padding: "15px",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => onMovieClick(movie.imdbID)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0, 0, 0, 0.2)";
                }}
              >
                {movie.imdbRating && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                      color: "#000",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      zIndex: 2,
                    }}
                  >
                    ⭐ {movie.imdbRating}
                  </div>
                )}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                  }}
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/150x225/667eea/ffffff?text=No+Image"
                    }
                    alt={movie.Title}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "12px",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h3
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "white",
                    textAlign: "center",
                    lineHeight: "1.3",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {movie.Title}
                </h3>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center",
                  }}
                >
                  {movie.Year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestFilmsCarousel;
