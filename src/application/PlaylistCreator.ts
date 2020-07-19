import { Track } from '../domain/Track';
import { PlaylistRepository } from '../domain/PlaylistRepository';
import { Playlist } from '../domain/Playlist';
import { PlaylistDTO } from './PlaylistDTO';

export class PlaylistCreator {
  constructor(private repo: PlaylistRepository) {}

  async create(dto: PlaylistDTO) {
    const tracks = dto.tracks.map((track) => new Track());
    const playlist = new Playlist(dto.name, dto.tracks);
    await this.create(playlist);
  }
}
