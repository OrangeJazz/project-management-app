import React, { ChangeEvent, useState } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  searchValue: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue }) => {
  const [value, setValue] = useState('');
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setValue(str);
  };
  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchValue(value);
    setValue('');
  };

  return (
    <div className={styles['search__container']}>
      <form onSubmit={submitHandler} className={styles.search}>
        <input
          type="search"
          className={styles['search__input']}
          placeholder="Enter Project Name..."
          value={value}
          id="search"
          onChange={changeHandler}
        />
        <button type="submit" className={styles.search__button}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
