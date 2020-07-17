import { UserProfile } from './UserProfile';

export interface PlaylistProvider {
  getProfile(): Promise<UserProfile>;
}
