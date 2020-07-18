import { PlaylistTrack } from './PlaylistTrack';

export interface Playlist {
  id: string;
  name: string;
  tracks: PlaylistTrack[];
}
