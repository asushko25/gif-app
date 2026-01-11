import { useState, useCallback } from 'react';
import { giphyApi, GIFData } from '../api/giphy';

const GIFS_PER_PAGE = 20;

interface UseGifSearchReturn {
  gifs: GIFData[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  search: (query: string) => void;
  loadMore: () => void;
}

export const useGifSearch = (): UseGifSearchReturn => {
  const [gifs, setGifs] = useState<GIFData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const performSearch = useCallback(async (searchQuery: string, nextOffset: number) => {
    if (!searchQuery.trim()) {
      setGifs([]);
      setHasMore(false);
      setOffset(0);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await giphyApi.search(searchQuery, GIFS_PER_PAGE, nextOffset);

      if (nextOffset === 0 && response.data.length === 0) {
        setError('Nothing found');
        setGifs([]);
        setHasMore(false);
        setOffset(0);
        return;
      }

      setGifs(prev => (nextOffset === 0 ? response.data : [...prev, ...response.data]));

      const newOffset = nextOffset + response.pagination.count;
      setOffset(newOffset);
      setHasMore(newOffset < (response.pagination.total_count ?? 0));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search error');
      if (nextOffset === 0) {
        setGifs([]);
        setHasMore(false);
        setOffset(0);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      setOffset(0);
      setHasMore(false);
      if (!searchQuery.trim()) {
        setError(null);
      }
      performSearch(searchQuery, 0);
    },
    [performSearch]
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore && query) {
      performSearch(query, offset);
    }
  }, [loading, hasMore, query, offset, performSearch]);

  return {
    gifs,
    loading,
    error,
    hasMore,
    search,
    loadMore,
  };
};
