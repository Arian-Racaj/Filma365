import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieModal from "./components/MovieModal.jsx";
import BestFilmsCarousel from "./components/BestFilmsCarousel.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

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

// List of popular movies for the best films carousel
const bestFilmTitles = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "Fight Club",
  "Forrest Gump",
  "Inception",
  "The Matrix",
];

function App() {
  // Auth state
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [authError, setAuthError] = useState("");

  // Movie app state
  const [query, setQuery] = useState(getRandomQuery());
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bestFilms, setBestFilms] = useState([]);
  const [isBestFilmsLoading, setIsBestFilmsLoading] = useState(true);

  // Demo: fake register/login (no backend)
  const [registered, setRegistered] = useState({}); // { email: password }

  // Auth handlers
  const handleLogin = ({ email, password }) => {
    setAuthError("");
    // Demo: accept any email, password 'test123' or registered user
    if (
      (registered[email] && registered[email] === password) ||
      password === "test123"
    ) {
      setUser({ email });
    } else {
      setAuthError("Email ose fjalëkalim i pasaktë.");
    }
  };
  const handleRegister = ({ email, password, confirm }) => {
    setAuthError("");
    if (!email || !password) {
      setAuthError("Plotëso të gjitha fushat.");
      return;
    }
    if (password !== confirm) {
      setAuthError("Fjalëkalimet nuk përputhen.");
      return;
    }
    setRegistered((prev) => ({ ...prev, [email]: password }));
    setShowLogin(true);
    setAuthError("");
  };
  const handleLogout = () => {
    setUser(null);
    setAuthError("");
  };

  // Fetch best films for the carousel
  useEffect(() => {
    async function fetchBestFilms() {
      setIsBestFilmsLoading(true);
      try {
        const moviePromises = bestFilmTitles.map(async (title) => {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(
              title
            )}&plot=short`
          );
          const data = await res.json();
          return data.Response === "True" ? data : null;
        });
        const results = await Promise.all(moviePromises);
        setBestFilms(results.filter(Boolean));
      } catch {
        setBestFilms([]);
      } finally {
        setIsBestFilmsLoading(false);
      }
    }
    fetchBestFilms();
  }, []);

  // Fetch movies for the current query and page
  const fetchMovies = async () => {
    try {
      const res1 = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      const data1 = await res1.json();
      let combined = [];

      if (data1.Search) {
        combined = data1.Search;
        setTotalResults(parseInt(data1.totalResults)); // Always update totalResults
        // Fetch next page to fill 12 movies
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
      console.error("Error fetching movies:", err);
      setMovies([]);
    }
  };

  const handleSearch = (e) => setSearchInput(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
    setPage(1);
    setTotalResults(0);
  };

  // Fetch and show details for a selected movie
  const handleMovieClick = async (imdbID) => {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  const closeModal = () => setSelectedMovie(null);

  const totalPages = Math.ceil(totalResults / 12);

  useEffect(() => {
    fetchMovies();
  }, [query, page]);

  // Show login/register if not logged in
  if (!user) {
    return showLogin ? (
      <LoginForm
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setAuthError("");
        }}
        error={authError}
      />
    ) : (
      <RegisterForm
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setShowLogin(true);
          setAuthError("");
        }}
        error={authError}
      />
    );
  }

  // Main app UI
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Filma365 🎬</h1>
        <button
          onClick={handleLogout}
          style={{
            background: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Dil
        </button>
      </div>
      {/* Best Films Carousel at the top */}
      {isBestFilmsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            gap: "20px",
          }}
        >
          <div style={{ fontSize: "32px", animation: "bounce 1s infinite" }}>
            ⭐
          </div>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "16px",
              animation: "pulse 2s infinite",
            }}
          >
            Duke ngarkuar filmat më të mirë...
          </p>
        </div>
      ) : (
        <BestFilmsCarousel movies={bestFilms} onMovieClick={handleMovieClick} />
      )}
      <form onSubmit={handleSearchSubmit}>
        <SearchBar value={searchInput} onChange={handleSearch} />
      </form>
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
