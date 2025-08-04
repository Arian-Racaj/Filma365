import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./components/SearchBar.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieModal from "./components/MovieModal.jsx";
import BestFilmsCarousel from "./components/BestFilmsCarousel.jsx";
import LoginButton from "./components/LoginButton.jsx";
import Profile from "./components/Profile.jsx";

const API_KEY = "568e3024";

// Category definitions
const CATEGORIES = {
  movies: {
    name: "Movies",
    icon: "🎬",
    subcategories: [
      { name: "Action", query: "action", icon: "💥" },
      { name: "Comedy", query: "comedy", icon: "😂" },
      { name: "Drama", query: "drama", icon: "🎭" },
      { name: "Horror", query: "horror", icon: "👻" },
      { name: "Romance", query: "romance", icon: "💕" },
      { name: "Sci-Fi", query: "sci-fi", icon: "🚀" },
      { name: "Thriller", query: "thriller", icon: "😱" },
      { name: "War", query: "war", icon: "⚔️" },
    ]
  },
  series: {
    name: "TV Series",
    icon: "📺",
    subcategories: [
      { name: "Action", query: "action series", icon: "💥" },
      { name: "Comedy", query: "comedy series", icon: "😂" },
      { name: "Drama", query: "drama series", icon: "🎭" },
      { name: "Crime", query: "crime series", icon: "🕵️" },
      { name: "Mystery", query: "mystery series", icon: "🔍" },
      { name: "Romance", query: "romance series", icon: "💕" },
      { name: "Sci-Fi", query: "sci-fi series", icon: "🚀" },
      { name: "Thriller", query: "thriller series", icon: "😱" },
    ]
  }
};

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
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Category state
  const [activeCategory, setActiveCategory] = useState("movies");
  const [activeSubcategory, setActiveSubcategory] = useState("Action");

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
    setTotalResults(0);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveSubcategory("Action"); // Reset to first subcategory
  };

  const handleSubcategoryChange = (subcategory) => {
    setActiveSubcategory(subcategory);
    const selectedSub = CATEGORIES[activeCategory].subcategories.find(
      sub => sub.name === subcategory
    );
    if (selectedSub) {
      setQuery(selectedSub.query);
      setPage(1);
      setTotalResults(0);
    }
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
      {/* Header */}
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

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit}>
        <SearchBar value={searchInput} onChange={handleSearch} />
      </form>

      {/* Category Menu */}
      <div style={{ marginBottom: "30px" }}>
        {/* Main Categories */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
            justifyContent: "center",
          }}
        >
          {Object.entries(CATEGORIES).map(([key, category]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              style={{
                background: activeCategory === key
                  ? "linear-gradient(45deg, #667eea, #764ba2)"
                  : "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "25px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: activeCategory === key
                  ? "0 8px 25px rgba(102, 126, 234, 0.3)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== key) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.background = "rgba(255, 255, 255, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== key) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                }
              }}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {CATEGORIES[activeCategory].subcategories.map((subcategory) => (
            <button
              key={subcategory.name}
              onClick={() => handleSubcategoryChange(subcategory.name)}
              style={{
                background: activeSubcategory === subcategory.name
                  ? "linear-gradient(45deg, #ff6b6b, #4ecdc4)"
                  : "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => {
                if (activeSubcategory !== subcategory.name) {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.background = "rgba(255, 255, 255, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSubcategory !== subcategory.name) {
                  e.target.style.transform = "scale(1)";
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                }
              }}
            >
              <span>{subcategory.icon}</span>
              {subcategory.name}
            </button>
          ))}
        </div>
      </div>

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
