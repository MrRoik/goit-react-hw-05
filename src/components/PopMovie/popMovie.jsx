import { Link, useLocation } from 'react-router-dom';
import css from './popMovie.module.css';

export const PopularMovie = ({ popMovie }) => {
  const location = useLocation();

  return (
    <ul className={css.list_popular}>
      {popMovie.map(item => (
        <li key={item.id} className={css.list_item_popular}>
          <Link to={`/movies/${item.id}`} state={location}>
            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} />
            <p>{item.original_title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
