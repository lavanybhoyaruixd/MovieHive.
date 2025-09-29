import { useState, useEffect, useCallback } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Debounce function to delay API calls
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      // Only search if query has at least 4 characters or is empty (to show popular movies)
      if (searchQuery.length >= 4 || searchQuery.length === 0) {
        onSearch(searchQuery);
      }
    }, 500), // 500ms delay
    [onSearch]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Handle form submit (still works for immediate search)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  // Clear search when component unmounts
  useEffect(() => {
    return () => {
      // Clear any pending debounced calls
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for movies... (type at least 4 characters)"
          className="search-input"
        />
        <button type="submit" className="search-button">
          <img src="/search.svg" alt="Search" />
        </button>
      </div>
      {query.length > 0 && query.length < 4 && (
        <div className="search-hint">
          Type at least 4 characters to see results
        </div>
      )}
    </form>
  );
};

export default Search;
