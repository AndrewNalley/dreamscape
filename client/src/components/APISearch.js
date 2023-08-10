import React, { useState } from 'react';
import SearchInput from '../utils/API';
import PhotoAPI from '../utils/API';

const APISearch = () => {
  const [searchOption, setSearchOption] = useState('');

  const handleSearch = (option) => {
    setSearchOption(option);
  };

  // decide whether to provide buttons for search
  // or to let users type in anything they want

  return (
    <div>
      <h1>Search</h1>
      <SearchInput onSearch={handleSearch} />
      <PhotoAPI searchOption={searchOption} />
    </div>
  );
};

export default APISearch;
