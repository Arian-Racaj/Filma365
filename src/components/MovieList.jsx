import React from "react";
import MovieCard from "./MovieCard.jsx";

function MovieList({ movies, onMovieClick }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        justifyContent: "center",
        padding: "20px 0",
        animation: "fadeIn 0.8s ease-out",
      }}
    >
      {movies.map((movie, index) => (
        <div
          key={movie.imdbID}
          style={{
            animation: `scaleIn 0.6s ease-out ${index * 0.1}s both`,
          }}
        >
          <MovieCard movie={movie} onClick={onMovieClick} />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
