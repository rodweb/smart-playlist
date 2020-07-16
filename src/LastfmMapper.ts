import { ListenedTrack } from './ListenedTrack';

interface RecentTrack {
  name: string;
  url: string;
  mbid: string;
  '@attr': {
    nowplaying: string;
  };
  artist: {
    mbid: string;
    '#text': string;
  };
  album: {
    mbid: string;
    '#text': string;
  };
  date: {
    uts: string;
  };
}

export class LastfmMapper {
  toListenedTrack(tracks: RecentTrack[]): ListenedTrack[] {
    return tracks
      .filter((track) => track['@attr']?.nowplaying !== 'true')
      .map((track) => ({
        name: track.name,
        artist: track.artist['#text'],
        album: track.album['#text'],
        listenedAt: new Date(Number(track.date.uts) * 1000),
      }));
  }
}
