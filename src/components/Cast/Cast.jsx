import { useEffect, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import { getCast } from '../../api';

export default function Cast() {
  const [castMovie, setCastMovie] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fethCast() {
      try {
        setLoading(true);
        const fethedCast = await getCast(movieId);
        setCastMovie(fethedCast.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fethCast();
  }, [movieId]);
  return (
    <div>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {castMovie.length > 0 ? (
        <ul className={css.list_cast}>
          {castMovie.map(item => (
            <li key={item.id} className={css.list_item_cast}>
              <img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We do not have any cast for this movie.</p>
      )}
    </div>
  );
}
