import { UserProfile } from '../../../UserProfile';
import { MeResponse } from './responses/MeResponse';

export class SpotifyMapper {
  toUserProfile(response: MeResponse): UserProfile {
    return {
      id: response.id,
      name: response.display_name || response.id,
      email: response.email,
    };
  }
}
