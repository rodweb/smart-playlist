import { UserProfile } from './UserProfile';
import { PlaylistDetail } from './PlaylistDetail';
import { Playlist } from './Playlist';

export interface PlaylistProvider {
  getProfile(): Promise<UserProfile>;
  create(detail: PlaylistDetail): Promise<void>;
  updateDetails(details: Partial<PlaylistDetail>): Promise<void>;
  getPlaylists(): Promise<Playlist[]>;
}
