import { UserProfile } from './domain/UserProfile';
import { PlaylistDetail } from './domain/PlaylistDetail';
import { Playlist } from './domain/Playlist';
import { Track } from './domain/Track';

export interface PlaylistProvider {
  getProfile(): Promise<UserProfile>;
  create(detail: PlaylistDetail): Promise<void>;
  updateDetails(details: Partial<PlaylistDetail>): Promise<void>;
  getPlaylists(): Promise<Playlist[]>;
  replaceTracks(id: string, tracks: Track[]): Promise<void>;
  addTracks(id: string, tracks: Track[]): Promise<void>;
}
