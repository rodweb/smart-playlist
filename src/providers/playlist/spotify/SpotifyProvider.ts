import axios, { AxiosInstance } from 'axios';
import { PlaylistProvider } from '../../../PlaylistProvider';
import { UserProfile } from '../../../domain/UserProfile';
import { SpotifyMapper } from './SpotifyMapper';
import { MeObject } from './responses/MeObject';
import { PlaylistDetail } from '../../../domain/PlaylistDetail';
import { Playlist } from '../../../domain/Playlist';
import { PlaylistFullObject } from './responses/PlaylistFullObject';
import { PlaylistObject } from './responses/PlaylistObject';
import { PagingObject } from './responses/PagingObject';
import { Track } from '../../../domain/Track';

interface Args {
  apiUrl: string;
  accessToken: string;
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
    const { data } = await this.http.get<MeObject>('me');
    return this.mapper.toUserProfile(data);
  }

  async updateDetails(details: Partial<PlaylistDetail>): Promise<void> {
    return Promise.resolve();
  }

  async create(detail: PlaylistDetail): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getPlaylists(): Promise<Playlist[]> {
    const { data } = await this.http.get<PagingObject<PlaylistObject>>('me/playlists');
    return (data.items || []).map((item) => this.mapper.toPlaylist(item));
  }

  async replaceTracks(id: string, tracks: Track[]): Promise<void> {
    const uris = tracks.slice(0, 100).map((track) => track.id);
    await this.http.put(`playlists/${id}/tracks`, { uris });
  }

  async addTracks(id: string, tracks: Track[]): Promise<void> {
    const uris = tracks.slice(0, 100).map((track) => track.id);
    await this.http.post(`playlists/${id}/tracks`, { uris });
  }
}
