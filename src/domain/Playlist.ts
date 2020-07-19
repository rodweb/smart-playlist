import { PlaylistTrack } from './PlaylistTrack';
import { v4 } from 'uuid';

export class Playlist {
  readonly uuid: string;
  constructor(readonly name: string, readonly tracks: ReadonlyArray<PlaylistTrack>) {
    this.uuid = v4();
    if (tracks.length > 100) throw new Error('Cannot create playlist with more than 100 tracks');
  }
}
