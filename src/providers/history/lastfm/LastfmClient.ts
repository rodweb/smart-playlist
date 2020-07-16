import axios, { AxiosInstance } from 'axios';
import querystring from 'querystring';
import { Options } from '../../../HistoryProvider';

const baseURL = 'http://ws.audioscrobbler.com/2.0/';
const user = 'rodweb';

const defaultPagination = { page: 1, limit: 200 };

export class LastfmClient {
  private http: AxiosInstance;
  constructor(private key: string) {
    this.http = axios.create({
      baseURL,
    });
  }

  async get<T>(
    method: string,
    options: Options = { pagination: defaultPagination }
  ): Promise<T> {
    const qs = querystring.stringify({
      format: 'json',
      api_key: this.key,
      page: options.pagination.page,
      limit: options.pagination.limit,
      user,
      method,
    });
    const { data, status } = await this.http.get(`?${qs}`);
    return data;
  }
}
