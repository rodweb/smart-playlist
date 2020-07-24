import axios, { AxiosInstance } from 'axios';
import querystring from 'querystring';

const BASE_URL = 'https://api.spotify.com/v1/';

type MediaType = 'album' | 'artist' | 'playlist' | 'track' | 'episode';
interface Pagination {
  limit?: number;
  offset?: number;
}

export class SpotifyAPI {
  private client: AxiosInstance;

  constructor(private accessToken: string) {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  async search(query: string, types: MediaType[], market?: string, { limit, offset }: Pagination = {}) {
    const qs = querystring.stringify({
      q: query,
      type: types.join(','),
    });
    const { data, status } = await this.client.get(`search?${qs}`);
  }
}
