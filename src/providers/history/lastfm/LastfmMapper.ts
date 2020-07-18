import { ListenedTrack } from '../../../domain/ListenedTrack';
import { RecentTrackResponse } from './responses/RecentTrackResponse';

export class LastfmMapper {
  toListenedTrack(response: RecentTrackResponse): ListenedTrack[] {
    return response.recenttracks.track
      .filter((track) => track['@attr']?.nowplaying !== 'true')
      .map((track) => ({
        name: track.name,
        artist: track.artist['#text'],
        album: track.album['#text'],
        listenedAt: new Date(Number(track.date.uts) * 1000),
      }));
  }
}
