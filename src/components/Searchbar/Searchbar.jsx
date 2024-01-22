import { useState } from 'react';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');

  const submitCheck = event => {
    event.preventDefault();
    onSubmit( searchInput.trim() );
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={submitCheck}>
        <button type="submit" className={css.button}>
          <span className={css.label}>Search</span>
        </button>

        <input
          name="searchInput"
          value={searchInput}
          onChange={event => {
            setSearchInput(event.target.value);
          }}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
