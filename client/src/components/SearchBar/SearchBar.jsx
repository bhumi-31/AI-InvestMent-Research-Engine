import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styles from "./SearchBar.module.css";

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
        <div className={styles.searchContainer}>
            <form onSubmit={handleSubmit} className={styles.searchBar}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Enter a company name (e.g., Tesla, Apple, Microsoft)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className={styles.searchButton}
                    disabled={loading || !query.trim()}
                >
                    <SearchIcon style={{ fontSize: '1.1rem' }} />
                    Analyze
                </button>
            </form>

            <div className={styles.searchSuggestions}>
                {suggestions.map((company) => (
                    <button type = "button"
                        key={company}
                        className={styles.suggestionChip}
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