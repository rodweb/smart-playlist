export interface Attr {
  page: string;
  perPage: string;
  user: string;
  total: string;
  totalPages: string;
}

export interface Artist {
  name: string;
  mbid: string;
  '#text': string;
}

export interface Album {
  mbid: string;
  '#text': string;
}

export interface Image {
  size: string;
  '#text': string;
}

export interface Date {
  uts: string;
  '#text': string;
}

export interface Track {
  artist: Artist;
  album: Album;
  image: Image[];
  streamable: string;
  date: Date;
  url: string;
  name: string;
  mbid: string;
}

export interface RecentTracks {
  recenttracks: {
    '@attr': Attr;
    track: Track[];
  };
}
