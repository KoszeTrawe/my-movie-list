import { useState } from "react";
import movies from "./data/movies.json";
import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
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


  const filteredMovies =
  filter === "Nieobejrzane" ? movies.filter((movie) => !watchedMovies.includes(movie.id))
  : filter === "Obejrzane" ? movies.filter((movie) => watchedMovies.includes(movie.id))
  : movies;

  return (
    <div className="app">
      <h1>Lista filmów</h1>

      <p className="counter">
        Obejrzane: <strong>{watchedMovies.length}</strong> / {movies.length}
      </p>

      <div className="filters">
        <button
          className={filter === "Wszystkie" ? "active" : ""}
          onClick={() => setFilter("Wszystkie")}
        >
          Wszystkie
        </button>

        <button
          className={filter === "Obejrzane" ? "active" : ""}
          onClick={() => setFilter("Obejrzane")}
        >
          Obejrzane
        </button>

        <button
          className={filter === "Nieobejrzane" ? "active" : ""}
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
