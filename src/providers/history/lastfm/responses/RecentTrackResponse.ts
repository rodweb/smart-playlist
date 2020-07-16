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

export interface RecentTrackResponse {
  recenttracks: {
    track: RecentTrack[];
  };
}
