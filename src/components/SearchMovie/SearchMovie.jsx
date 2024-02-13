import toast from 'react-hot-toast';
import css from './SearchMovie.module.css';

export const SearchMovie = ({ onSearch }) => {
  const handleSubmit = evt => {
    evt.preventDefault();

    if (evt.target.elements.query.value.trim() === '') {
      toast.error('Enter data in the search field');
      return;
    }
    onSearch(evt.target.elements.query.value);
    evt.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        className={css.inputSearch}
      />
      <button type="submit" className={css.btn}>
        Search
      </button>
    </form>
  );
};
