import React, { useState } from 'react';
import styles from './SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search for any IP address or domain"
        value={query}
        onChange={handleChange}
      />
      <button type="submit" className={styles.button}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
      </button>
    </form>
  );
};

export default SearchForm;