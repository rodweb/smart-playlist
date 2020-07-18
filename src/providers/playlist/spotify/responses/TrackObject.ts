import { ExternalUrlsObject } from './ExternalUrlsObject';
import { ArtistObject } from './ArtistObject';
import { AlbumObject } from './AlbumObject';

interface TrackLinkObject {}

interface RestrictionsObject {}

export interface TrackObject {
  album: AlbumObject;
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: TrackLinkObject;
  restrictions: RestrictionsObject;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
}
