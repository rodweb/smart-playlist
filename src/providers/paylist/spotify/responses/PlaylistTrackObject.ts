import { UserObject } from './UserObject';
import { TrackObject } from './TrackObject';
import { EpisodeObject } from './EpisodeObject';

export interface PlaylistTrackObject {
  added_at: Date | null;
  added_by: UserObject;
  is_local: boolean;
  track: TrackObject | EpisodeObject;
}
