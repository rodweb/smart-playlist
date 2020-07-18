import { ExternalUrlsObject } from './ExternalUrlsObject';

interface AlbumObject {}

interface ArtistObject {}

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
  type: string;
  uri: string;
  is_local: boolean;
}
