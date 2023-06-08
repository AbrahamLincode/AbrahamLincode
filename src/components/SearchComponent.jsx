import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const apiKey = 'AIzaSyAP5oPkRKtZWnK_HaGJnL1SKM2ILRfjkik';
      const cx = '51e1aa46ded4b4052';
      const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}`;

      const response = await axios.get(url);
      setSearchResults(response.data.items);
    } catch (error) {
      console.log('Hata:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Arama yapın..."
        />
        <button type="submit">Ara</button>
      </form>

      <ul>
        {searchResults.map((result) => (
          <li key={result.cacheId}>
            <a href={result.link}>{result.title}</a>
            <p>{result.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
