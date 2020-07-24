interface User {
  uuid: string;
  name: string;
  email: string;
  lastfmId?: string;
  lastfmSyncedAt?: Date;
  spotifyId?: string;
}

interface RecentTrack {
  trackId: string;
  listenedAt: Date;
}

interface Track {
  uuid: string;
  name: string;
  artist: string;
  album: string;
  firstPlayed: Date;
  lastPlayed: Date;
  playCount: number;
  lastfmId: string;
  spotifyId?: string;
}

// many lastfm tracks -> 1 smart track
// 1 smart track -> 1 spotify track

interface Playlist {
  uuid: string;
  name: string;
  spotifyId?: string;
  tracks: string[];
  syncedAt?: Date;
}

class SmartPlaylistService {
  async findTracks() {
    // given some spec
  }

  async list() {
    // return all smart playlists
  }

  async create() {
    // create spotify playlist
    // create smart playlist
  }

  async replace(uuid: string, tracks: Track[]) {
    // get smart playlist
    // update tracks
  }

  async remove(uuid: string) {
    // remove spotify playlist
    // remove smart playlist
  }

  async updateTracks() {
    // loop over recent tracks
    // - if matches rules of a playlist
    //   - add to the playlist
  }

  async getRecentTracks() {
    // get last timestamp
    // pool from last timestamp
    // loop over recent tracks
    // - if track already exists, update its dates and play count
  }
}
