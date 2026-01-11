import { useState } from 'react';
import { useGifSearch } from './hooks/useGifSearch';
import { SearchBar } from './components/SearchBar/SearchBar';
import { GIFList } from './components/GIFList/GIFList';
import { GIFDetail } from './components/GIFDetail/GIFDetail';
import { GIFData } from './api/giphy';
import './App.scss';

function App() {
  const { gifs, loading, error, hasMore, search, loadMore } = useGifSearch();
  const [selectedGif, setSelectedGif] = useState<GIFData | null>(null);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">GIF Search</h1>
        <p className="app__subtitle">Find the perfect GIF animation</p>
      </header>

      <main className="app__main">
        <SearchBar onSearch={search} loading={loading} />
        
        {error && (
          <div className="app__error">
            <p>{error}</p>
          </div>
        )}

        <GIFList
          gifs={gifs}
          onGifClick={setSelectedGif}
          hasMore={hasMore}
          onLoadMore={loadMore}
          loading={loading}
          error={error}
        />
      </main>

      {selectedGif && (
        <GIFDetail
          gif={selectedGif}
          onClose={() => setSelectedGif(null)}
        />
      )}
    </div>
  );
}

export default App;

