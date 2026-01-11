import { useState, FormEvent, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    onSearch(debouncedQuery.trim());
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Enter a keyword to search for GIFs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />
      <button 
        type="submit" 
        className="search-bar__button"
        disabled={loading || !query.trim()}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

