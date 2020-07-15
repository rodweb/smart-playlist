import axios, {AxiosInstance} from 'axios'
import querystring from 'querystring';

const baseURL = 'http://ws.audioscrobbler.com/2.0/';
const user = 'rodweb';

export class LastfmClient {
  private http: AxiosInstance;
  constructor(private key: string) {
    this.http = axios.create({
      baseURL,
    });
  }

  async getRecentTracks() {
    await this.get('user.getRecentTracks');
  }

  private async get(method: string) {
    const qs = querystring.stringify({
      format: 'json',
      api_key: this.key,
      user,
      method,
    })
    const { data, status } = await this.http.get(`?${qs}`);
    console.log({ status });
    console.log(JSON.stringify(data, null, 2));
  }
}
