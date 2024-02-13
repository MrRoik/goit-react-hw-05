import { NavLink, Outlet } from 'react-router-dom';
import css from './MovieDetails.module.css';
import clsx from 'clsx';
import { Suspense } from 'react';
import { LoaderPage } from '../Loader';

const linkClass = ({ isActive }) => {
  return clsx(css.block_title, isActive && css.active);
};

export const MovieDetails = ({ movie }) => {
  return (
    <div>
      <div className={css.card_movie}>
        <img
          width="200"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={css.card_movie_desc}>
          <h2>
            {movie.original_title} ({movie.release_date})
          </h2>
          <h4>Vote average: {movie.vote_average}</h4>
          <div>
            <h3>Overview</h3>
            <p className={css.list_details_text}>{movie.overview}</p>
          </div>
          <div>
            <h3>Genres</h3>
            {movie.genres && (
              <p className={css.list_details_text}>
                {movie.genres.map(genre => genre.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={css.card_movie_inf}>
        <h4 className={css.title_inf}>Additional information</h4>
        <NavLink to="cast" className={linkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={linkClass}>
          Reviews
        </NavLink>
      </div>
      <Suspense fallback={<LoaderPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
