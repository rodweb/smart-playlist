import { PlaylistProvider } from './PlaylistProvider';
import { SpotifyProvider } from './providers/playlist/spotify/SpotifyProvider';
import { EnvironmentVariables } from './environment';

interface Args {
  env: EnvironmentVariables;
  accessToken?: string;
  refreshToken?: string;
}

export class PlaylistProviderFactory {
  static create({ env, accessToken }: Args): PlaylistProvider {
    if (accessToken) {
      return new SpotifyProvider({
        accessToken,
        apiUrl: env.spotify.apiUrl,
      });
    }
    throw new Error('Could not create PlaylistProvider');
  }
}
