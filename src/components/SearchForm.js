// src/components/SearchForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './SearchForm.css';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const SHEET_BEST_API_ENDPOINT = 'https://sheet.best/api/sheets/e3917dd4-da7e-4ad1-8c27-a38e5ee0eb8a';

  const searchData = async () => {
    try {
      const response = await axios.get(
        `${SHEET_BEST_API_ENDPOINT}?searchTerm=${searchTerm}`
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        const filteredResults = response.data
          .filter((result) => result && Object.keys(result).length > 0)
          .map((result) => {
            const validProperties = Object.keys(result).filter(
              (key) => result[key] !== null
            );

            const filteredResult = {};
            validProperties.forEach((key) => {
              filteredResult[key] = result[key];
            });

            return filteredResult;
          });

        setSearchResult(filteredResults);
        setError(null);
      } else {
        setSearchResult(null);
        setError('No record found for the provided search term.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResult(null);
      setError('Error fetching data. Please try again.');
    }
  };

  return (
    <div>
      <h2>Search Form</h2>
      <label>
        Enter Email or Service Number:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
      </label>
      <button onClick={searchData}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {searchResult && (
        <div>
          <h3>Search Results:</h3>
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
