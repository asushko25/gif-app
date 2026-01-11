import { GIFData } from '../../api/giphy';
import { GIFCard } from '../GIFCard/GIFCard';
import './GIFList.scss';

interface GIFListProps {
  gifs: GIFData[];
  onGifClick: (gif: GIFData) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  loading: boolean;
  error?: string | null;
}

export const GIFList = ({ gifs, onGifClick, hasMore, onLoadMore, loading, error }: GIFListProps) => {
  if (gifs.length === 0 && !loading && !error) {
    return (
      <div className="gif-list__empty">
        <p>Enter a keyword to search for GIF animations</p>
      </div>
    );
  }

  return (
    <div className="gif-list">
      <div className="gif-list__grid">
        {gifs.map((gif) => (
          <GIFCard key={gif.id} gif={gif} onClick={onGifClick} />
        ))}
      </div>
      {hasMore && (
        <button
          className="gif-list__load-more"
          onClick={onLoadMore}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

