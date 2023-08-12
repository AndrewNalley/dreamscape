import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [searchOption, setSearchOption] = useState('');

  const handleSearch = () => {
    onSearch(searchOption);
  };

  return (
    <div>
      <input
        type="text"
        value={searchOption}
        onChange={(event) => setSearchOption(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchInput;