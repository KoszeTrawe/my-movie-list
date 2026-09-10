interface MovieCardProps {
  title: string;
  year: number;
  genre: string[];
  watched: boolean;
  rating: number;
  onToggleWatched: () => void;
  onRate: (rating: number) => void;
}

function MovieCard({title, year, genre, watched, rating, onToggleWatched, onRate}: MovieCardProps) {
  return (
    <div className={`movie-card ${watched ? "watched" : ""}`}>
      <h2>{title}</h2>

      <p>Rok produkcji: {year}</p>
      <p>Gatunek: {genre.join(", ")}</p>
      <div>
        {[1, 2, 3, 4, 5].map((rate) => (
          <button className={`movie-rate ${rate <= rating ? "on" : ""}`} key={rate} onClick={() => onRate(rate)}>
            ✮
          </button>
        ))}
      </div>
      <button className="watch-button" onClick={onToggleWatched}>
        {watched ? "✓ Obejrzany" : "Oznacz jako obejrzany"}
      </button>
    </div>
  );
}

export default MovieCard;
