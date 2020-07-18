export interface Track {
  name: string;
  artist: string;
  album: string;
  firstPlayed?: Date;
  lastPlayed?: Date;
  playlists: string[];
  liked: boolean;
}
