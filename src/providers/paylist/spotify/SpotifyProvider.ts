import axios, { AxiosInstance } from 'axios';
import { PlaylistProvider } from '../../../PlaylistProvider';
import { UserProfile } from '../../../UserProfile';
import { SpotifyMapper } from './SpotifyMapper';
import { MeResponse } from './responses/MeResponse';

interface Args {
  apiUrl: string;
  accessToken: string;
  refreshToken: string;
}

export class SpotifyProvider implements PlaylistProvider {
  private http: AxiosInstance;
  private mapper: SpotifyMapper;
  constructor({ apiUrl, accessToken }: Args) {
    this.http = axios.create({
      baseURL: apiUrl,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    this.mapper = new SpotifyMapper();
  }

  async getProfile(): Promise<UserProfile> {
    const { data } = await this.http.get<MeResponse>('me');
    return this.mapper.toUserProfile(data);
  }
}
