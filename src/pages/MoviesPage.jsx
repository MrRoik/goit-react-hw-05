//import axios from 'axios';
import { useEffect, useState } from 'react';
import css from '../components/App.module.css';
import { getMovies } from '../api';
import { MovieList } from '../components/MovieList/MovieList';
import { Loader } from '../components/Loader';
import { PageTitle } from '../components/PageTitle/PageTitle';
import { SearchMovie } from '../components/SearchMovie/SearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export default function MoviesPage() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  //const [isEmpty, setIsEmpty] = useState(true);

  const titleMovie = params.get('query') ?? '';
  const handleSearch = async newQuery => {
    if (titleMovie === newQuery) {
      return;
    }
    setSearchMovies([]);
    setParams({ query: newQuery });
  };

  useEffect(() => {
    async function searchMovie() {
      try {
        setLoading(true);
        const result = await getMovies(titleMovie);
        setSearchMovies(prevMov => [...prevMov, ...result.results]);
        /*if (result.results.length === 0) {
          setIsEmpty(false);
          return;
        }*/
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    searchMovie();
  }, [titleMovie]);

  return (
    <div className={css.moviesPage}>
      <PageTitle />
      {error && <ErrorMessage />}
      <SearchMovie value={titleMovie} onSearch={handleSearch} />
      {loading && <Loader />}
      {searchMovies.length > 0 && <MovieList movies={searchMovies} />}
      <Toaster position="bottom-center" />
    </div>
  );
}

//{isEmpty && <MessageNotFound />}
