import axios from 'axios';

export interface GIFData {
  id: string;
  title: string;
  username: string;
  import_datetime: string;
  images: {
    original: { url: string; width: string; height: string };
    fixed_height: { url: string };
  };
  url: string;
}

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const giphyApi = {
  search: async (query: string, limit: number = 20, offset: number = 0) => {
    try {
      const response = await axios.get<{
        data: GIFData[];
        pagination: { total_count: number; count: number; offset: number };
      }>(`${BASE_URL}/search`, {
        params: {
          api_key: API_KEY,
          q: query,
          limit,
          offset,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Error loading GIF from Giphy');
    }
  },

  getById: async (id: string): Promise<{ data: GIFData }> => {
    try {
      const response = await axios.get<{ data: GIFData }>(`${BASE_URL}/${id}`, {
        params: {
          api_key: API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Error loading GIF from Giphy');
    }
  },
};

