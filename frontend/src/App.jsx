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

  return (
    <div>
      <h1>🎬 Movie Watchlist</h1>

      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <span
              style={{
                textDecoration: movie.watched ? "line-through" : "none",
              }}
            >
              {movie.title} — {movie.genre} — {movie.year}
            </span>
            <button onClick={() => toggleWatched(movie._id)}>
              {movie.watched ? "Unwatched" : "Watched"}
            </button>
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
