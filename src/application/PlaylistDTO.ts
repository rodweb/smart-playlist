import { TrackDTO } from './TrackDTO';

export interface PlaylistDTO {
  tracks: TrackDTO[];
  name: string;
}
