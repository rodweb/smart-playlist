export class Track {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly artist: string,
    readonly album: string,
    readonly playCount: number,
    readonly firstPlayed?: Date,
    readonly lastPlayed?: Date
  ) {}
}
