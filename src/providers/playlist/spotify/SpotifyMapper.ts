import { UserProfile } from '../../../domain/UserProfile';
import { MeObject } from './responses/MeObject';
import { Playlist } from '../../../domain/Playlist';
import { PlaylistTrackObject } from './responses/PlaylistTrackObject';
import { TrackObject } from './responses/TrackObject';
import { PlaylistTrack } from '../../../domain/PlaylistTrack';
import { PlaylistObject } from './responses/PlaylistObject';

export class SpotifyMapper {
  toUserProfile(response: MeObject): UserProfile {
    return {
      id: response.id,
      name: response.display_name || response.id,
      email: response.email,
    };
  }
  toPlaylist(response: PlaylistObject): Playlist {
    function isTrack(item: PlaylistTrackObject['track']): item is TrackObject {
      return item.type === 'track';
    }
    const tracks: PlaylistTrack[] = [];
    response.tracks.items?.forEach((item) => {
      if (isTrack(item.track)) {
        tracks.push({
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
        });
      }
    });
    return {
      id: response.id,
      name: response.name,
      tracks,
    };
  }
}
