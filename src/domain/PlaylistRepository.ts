import { Playlist } from './Playlist';

export interface PlaylistRepository {
  create(playlist: Playlist): Promise<void>;
}
