import axios, { AxiosInstance } from 'axios';
import querystring from 'querystring';
import { LastfmMapper } from './LastfmMapper';

const baseURL = 'http://ws.audioscrobbler.com/2.0/';
const user = 'rodweb';

interface Pagination {
  page: number;
  limit: number;
}

const defaultPagination: Pagination = { page: 1, limit: 200 };

export class LastfmClient {
  private http: AxiosInstance;
  constructor(private key: string) {
    this.http = axios.create({
      baseURL,
    });
  }

  async getRecentTracks(pagination: Pagination = defaultPagination) {
    await this.get('user.getRecentTracks', pagination);
  }

  private async get(method: string, pagination: Pagination) {
    const qs = querystring.stringify({
      format: 'json',
      api_key: this.key,
      page: pagination.page,
      limit: pagination.limit,
      user,
      method,
    });
    const { data, status } = await this.http.get(`?${qs}`);
    const mapper = new LastfmMapper();
    const tracks = mapper.toListenedTrack(data.recenttracks.track);
    console.log({ status });
    console.log(JSON.stringify(tracks, null, 2));
  }
}
