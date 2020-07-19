export class Track {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly artist: string,
    readonly album: string,
    readonly firstPlayed?: Date,
    readonly lastPlayed?: Date
  ) // readonly playlists: string[],
  // readonly liked: boolean
  {}
}
