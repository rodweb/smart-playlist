import axios, { AxiosInstance } from 'axios';
import querystring from 'querystring';
import { UserInfo } from './musicbrainz/UserInfo';

const BASE_URL = 'https://musicbrainz.org/ws/2/';
export class MusicbrainzAPI {
  private client: AxiosInstance;

  constructor(private accessToken: string) {
    this.client = axios.create({
      baseURL: BASE_URL,
    });
  }

  async getUserInfo(): Promise<UserInfo> {
    return axios
      .get('https://musicbrainz.org/oauth2/userinfo', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then(({ data }) => data);
  }
}
