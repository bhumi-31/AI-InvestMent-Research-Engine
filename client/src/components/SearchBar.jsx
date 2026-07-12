import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch, loading }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed && !loading) {
            onSearch(trimmed);
        }
    };

    const suggestions = [
        "Apple",
        "Tesla",
        "Microsoft",
        "NVIDIA",
        "Amazon",
    ];

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-bar">
                <input
                    type="text"
                    className="search-bar__input"
                    placeholder="Enter a company name (e.g., Tesla, Apple, Microsoft)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="search-bar__btn"
                    disabled={loading || !query.trim()}
                >
                    <SearchIcon style={{ fontSize: '1.1rem' }} />
                    Analyze
                </button>
            </form>

            <div className="search-suggestions">
                {suggestions.map((company) => (
                    <button type = "button"
                        key={company}
                        className="suggestion-chip"
                        disabled={loading}
                        onClick={() =>{setQuery(company);
                            onSearch(company);
                        }}
                    >
                        {company}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;