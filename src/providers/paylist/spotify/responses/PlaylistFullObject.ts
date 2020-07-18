import { ExternalUrlsObject } from './ExternalUrlsObject';
import { FollowersObject } from './FollowersObject';
import { ImageObject } from './ImageObject';
import { UserObject } from './UserObject';
import { PagingObject } from './PagingObject';
import { PlaylistTrackObject } from './PlaylistTrackObject';

export interface PlaylistFullObject {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrlsObject;
  followers: FollowersObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: UserObject;
  public: boolean | null;
  snapshot_id: string;
  tracks: PagingObject<PlaylistTrackObject>;
}
