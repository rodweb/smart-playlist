import { ExternalUrlsObject } from './ExternalUrlsObject';
import { ImageObject } from './ImageObject';
import { ResumePointObject } from './ResumePointObject';
import { ShowObject } from './ShowObject';

export interface EpisodeObject {
  audio_preview_url: string | null;
  description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  resume_point: ResumePointObject;
  show: ShowObject;
  type: 'episode';
  uri: string;
}
