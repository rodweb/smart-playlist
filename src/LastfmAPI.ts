import axios, { AxiosInstance } from 'axios';
import querystring from 'querystring';
import { RecentTracks } from './lastfm/RecentTracks';

type Timestamp = number;
interface RecentTracksOptions {
  user: string;
  from?: Timestamp;
  to?: Timestamp;
  page?: number;
  limit?: number;
  extended?: 0 | 1;
}

const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

export class LastfmAPI {
  private client: AxiosInstance;

  constructor(private apiKey: string) {
    this.client = axios.create({
      baseURL: BASE_URL,
    });
  }

  async getRecentTracks({ user, from, limit, page, extended }: RecentTracksOptions) {
    const qs = querystring.stringify({
      method: 'user.getRecentTracks',
      format: 'json',
      api_key: this.apiKey,
      extended,
      from,
      page,
      limit,
      user,
    });
    return this.client.get<RecentTracks>(`?${qs}`).then(({ data }) => data);
  }
}
