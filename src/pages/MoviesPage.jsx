//import axios from 'axios';
import { useState } from 'react';
import { getMovies } from '../api';
import { MovieList } from '../components/MovieList/MovieList';
import { Loader } from '../components/Loader';
import { PageTitle } from '../components/PageTitle/PageTitle';
import { SearchMovie } from '../components/SearchMovie/SearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorMessage, MessageNotFound } from '../components/ErrorMessage/ErrorMessage';

export default function MoviesPage() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const [isEmpty, setIsEmpty] = useState(false);

  const titleMovie = params.get('query') ?? '';

  const searchMovie = async query => {
    try {
      setLoading(true);
      const result = await getMovies(query);
      setSearchMovies(result.results);
      const newParams = query !== '' ? { query } : {};
      setParams(newParams);
      if (result.results.length === 0) {
        setIsEmpty(true);
        return;
      }
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle />
      {error && <ErrorMessage />}
      <SearchMovie value={titleMovie} onSearch={searchMovie} />
      {loading && <Loader />}
      {searchMovies.length > 0 && <MovieList movies={searchMovies} />}
      {isEmpty && <MessageNotFound />}
      <Toaster position="bottom-center" />
    </div>
  );
}
