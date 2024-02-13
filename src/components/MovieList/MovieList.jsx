import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list_movie}>
      {movies.map(movie => (
        <li key={movie.id} className={css.list_item_movie}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <div>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <p>{movie.original_title}</p>
              <p>Rating: {movie.vote_average}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
