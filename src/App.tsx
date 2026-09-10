import { useState } from "react";
import moviesData from "./data/movies.json";
import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
  const [movies, setMovies] = useState(moviesData);
  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [filter, setFilter] = useState<string>("Wszystkie");

  const toggleWatched = (id: number) => {
    setWatchedMovies((current) =>
      current.includes(id) ? current.filter((movieId) => movieId !== id) : [...current, id]
    );
  };

  const addRating = (id: number, rating: number) => {
    setRatings((current) => (
      {...current, [id]: rating}
    ));
  };

  const addMovie = (title: string, year: number, genre: string[]) => {
    const newMovie = {
      id: movies.length > 0 ? Math.max(...movies.map((movie) => movie.id)) + 1 : 1,
      title, year, genre,
    };
    setMovies((current) => [...current, newMovie]);
  };

  const filteredMovies =
  filter === "Nieobejrzane" ? movies.filter((movie) => !watchedMovies.includes(movie.id))
  : filter === "Obejrzane" ? movies.filter((movie) => watchedMovies.includes(movie.id))
  : movies;

  return (
    <div className="app">
      <h1>Lista filmów</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.currentTarget;
          const fe = form.elements
          const title = (fe.namedItem("title") as HTMLInputElement).value || "Brak";
          const year = Math.max(Math.min(Number((fe.namedItem("year") as HTMLInputElement).value), 2026), 1900) || 2000;
          
          const genreSelect = fe.namedItem("genre") as HTMLSelectElement;
          const genre = Array.from(genreSelect.selectedOptions).map((option) => option.value);

          addMovie(title, year, genre);

          form.reset();
        }}
      >
        <input name="title" type="text" placeholder="Tytuł filmu" required/>
        <input name="year" type="number" placeholder="Rok" min="1900" max="2026" required/>
        
        <select name="genre" multiple required>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>

        <button type="submit">Dodaj film</button>
      </form>

      <p className="counter">
        Obejrzane: <strong>{watchedMovies.length}</strong> / {movies.length}
      </p>

      <div className="filters">
        <button className={filter === "Wszystkie" ? "active" : ""}
          onClick={() => setFilter("Wszystkie")}
        >
          Wszystkie
        </button>

        <button className={filter === "Obejrzane" ? "active" : ""}
          onClick={() => setFilter("Obejrzane")}
        >
          Obejrzane
        </button>

        <button className={filter === "Nieobejrzane" ? "active" : ""}
          onClick={() => setFilter("Nieobejrzane")}
        >
          Nieobejrzane
        </button>
      </div>

      <div className="movies">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              rating = {ratings[movie.id]}
              watched={watchedMovies.includes(movie.id)}
              onToggleWatched={() => toggleWatched(movie.id)}
              onRate ={(rating) => addRating(movie.id, rating)}
            />
          ))
        ) : (
          <p className="empty">Nie ma</p>
        )}
      </div>
    </div>
  );
}

export default App;
