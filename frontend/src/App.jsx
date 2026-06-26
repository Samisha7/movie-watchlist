import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get("http://localhost:5000/api/movies");
    setMovies(res.data);
  };

  const addMovie = async () => {
    if (!title || !genre || !year) return;
    await axios.post("http://localhost:5000/api/movies", {
      title,
      genre,
      year,
    });
    setTitle("");
    setGenre("");
    setYear("");
    fetchMovies();
  };

  const toggleWatched = async (id) => {
    await axios.put(`http://localhost:5000/api/movies/${id}`);
    fetchMovies();
  };

  const deleteMovie = async (id) => {
    await axios.delete(`http://localhost:5000/api/movies/${id}`);
    fetchMovies();
  };

  const watched = movies.filter((m) => m.watched);
  const unwatched = movies.filter((m) => !m.watched);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.emoji}>🎬</span>
          <h1 style={styles.title}>Movie Watchlist</h1>
          <p style={styles.subtitle}>
            {unwatched.length} to watch · {watched.length} watched
          </p>
        </div>

        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
          />
          <button style={styles.addBtn} onClick={addMovie}>
            Add Movie
          </button>
        </div>

        {unwatched.length > 0 && (
          <div>
            <p style={styles.sectionLabel}>UP NEXT</p>
            {unwatched.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onToggle={toggleWatched}
                onDelete={deleteMovie}
              />
            ))}
          </div>
        )}

        {watched.length > 0 && (
          <div>
            <p style={styles.sectionLabel}>WATCHED</p>
            {watched.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onToggle={toggleWatched}
                onDelete={deleteMovie}
              />
            ))}
          </div>
        )}

        {movies.length === 0 && (
          <div style={styles.empty}>
            <p>No movies yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MovieCard({ movie, onToggle, onDelete }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...styles.card, ...(hovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.cardLeft}>
        <p
          style={{
            ...styles.movieTitle,
            ...(movie.watched ? styles.strikethrough : {}),
          }}
        >
          {movie.title}
        </p>
        <p style={styles.movieMeta}>
          {movie.genre} · {movie.year}
        </p>
      </div>
      <div style={styles.cardRight}>
        <button
          style={{
            ...styles.btn,
            ...(movie.watched ? styles.btnUnwatch : styles.btnWatch),
          }}
          onClick={() => onToggle(movie._id)}
        >
          {movie.watched ? "↩ Unwatch" : "✓ Watched"}
        </button>
        <button
          style={{ ...styles.btn, ...styles.btnDelete }}
          onClick={() => onDelete(movie._id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f0f13",
    display: "flex",
    justifyContent: "center",
    padding: "40px 16px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: { width: "100%", maxWidth: "620px" },
  header: { textAlign: "center", marginBottom: "32px" },
  emoji: { fontSize: "48px" },
  title: {
    color: "#ffffff",
    fontSize: "32px",
    fontWeight: "700",
    margin: "8px 0 4px",
  },
  subtitle: { color: "#888", fontSize: "14px", margin: 0 },
  form: { display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" },
  input: {
    flex: 1,
    minWidth: "120px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #2a2a35",
    background: "#1a1a24",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  addBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#e50914",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  sectionLabel: {
    color: "#555",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
    marginBottom: "10px",
    marginTop: "24px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#1a1a24",
    borderRadius: "10px",
    padding: "14px 16px",
    marginBottom: "8px",
    border: "1px solid #2a2a35",
    transition: "border-color 0.2s",
  },
  cardHover: { borderColor: "#e50914" },
  cardLeft: { flex: 1 },
  cardRight: { display: "flex", gap: "8px" },
  movieTitle: {
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    margin: "0 0 4px",
  },
  movieMeta: { color: "#666", fontSize: "13px", margin: 0 },
  strikethrough: { textDecoration: "line-through", color: "#555" },
  btn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnWatch: { background: "#1e3a2e", color: "#4ade80" },
  btnUnwatch: { background: "#2a2a1e", color: "#facc15" },
  btnDelete: { background: "#2a1e1e", color: "#f87171" },
  empty: {
    textAlign: "center",
    color: "#444",
    padding: "60px 0",
    fontSize: "15px",
  },
};

export default App;
