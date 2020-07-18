import { ListenedTrack } from './domain/ListenedTrack';

interface Pagination {
  page: number;
  limit: number;
}

export interface Options {
  pagination: Pagination;
}

export interface HistoryProvider {
  getRecentTracks(options: Options): Promise<ListenedTrack[]>;
}
