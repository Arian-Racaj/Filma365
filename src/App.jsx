import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./components/SearchBar.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieModal from "./components/MovieModal.jsx";
import BestFilmsCarousel from "./components/BestFilmsCarousel.jsx";
import LoginButton from "./components/LoginButton.jsx";
import Profile from "./components/Profile.jsx";

const API_KEY = "568e3024";

const getRandomQuery = () => {
  const queries = [
    "love",
    "war",

    "hero",
    "superman",
    "star",
    "life",
    "night",
    "dream",
    "sky",
    "ghost",
  ];
  return queries[Math.floor(Math.random() * queries.length)];
};

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [query, setQuery] = useState(getRandomQuery());
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // kjo është faqja e API-së
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      const res1 = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      const data1 = await res1.json();
      let combined = [];

      if (data1.Search) {
        combined = data1.Search;
        if (!totalResults) {
          setTotalResults(parseInt(data1.totalResults));
        }

        // merr edhe faqen e radhës për të plotësuar 12
        const res2 = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${
            page + 1
          }`
        );
        const data2 = await res2.json();
        if (data2.Search) {
          combined = [...combined, ...data2.Search];
        }
      }

      setMovies(combined.slice(0, 12));
    } catch (err) {
      console.error("Gabim gjatë marrjes së filmave:", err);
      setMovies([]);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
    setPage(1);
    setTotalResults(0); // reset totalet
  };

  const handleMovieClick = async (imdbID) => {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së detajeve:", err);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const totalPages = Math.ceil(totalResults / 12);

  useEffect(() => {
    fetchMovies();
  }, [query, page]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "white",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Filma365 🎬</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {isAuthenticated ? <Profile /> : <LoginButton />}
        </div>
      </div>

      <form onSubmit={handleSearchSubmit}>
        <SearchBar value={searchInput} onChange={handleSearch} />
      </form>

      {/* Best Films Carousel */}
      {movies.length > 0 && (
        <BestFilmsCarousel
          movies={movies.slice(0, 6)}
          onMovieClick={handleMovieClick}
        />
      )}

      <MovieList movies={movies} onMovieClick={handleMovieClick} />

      <div style={{ marginTop: "20px" }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 2)}>
          ⬅️ Faqja e kaluar
        </button>
        <span style={{ margin: "0 10px" }}>
          Faqja {Math.ceil(page / 2)} nga {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalResults}
          onClick={() => setPage(page + 2)}
        >
          Faqja tjetër ➡️
        </button>
      </div>

      <MovieModal movie={selectedMovie} onClose={closeModal} />
    </div>
  );
}

export default App;
