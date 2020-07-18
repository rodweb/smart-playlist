import { ExternalUrlsObject } from './ExternalUrlsObject';
import { FollowersObject } from './FollowersObject';
import { ImageObject } from './ImageObject';

export interface UserObject {
  display_name: string | null;
  external_urls: ExternalUrlsObject;
  followers: FollowersObject;
  href: string;
  id: string;
  images: ImageObject[];
  type: string;
  uri: string;
}
