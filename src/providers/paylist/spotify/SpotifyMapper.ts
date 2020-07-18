import { UserProfile } from '../../../UserProfile';
import { MeObject } from './responses/MeObject';

export class SpotifyMapper {
  toUserProfile(response: MeObject): UserProfile {
    return {
      id: response.id,
      name: response.display_name || response.id,
      email: response.email,
    };
  }
}
