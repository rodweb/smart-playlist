import { EntitySchema } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';

export interface Login extends BaseEntity {
  email: string;
  refreshToken: string;
  spotifyToken: any;
  musicbrainzToken: any;
}

export const schema = new EntitySchema<Login, BaseEntity>({
  name: 'Login',
  extends: 'BaseEntity',
  properties: {
    email: { type: 'string' },
    refreshToken: { type: 'string' },
    musicbrainzToken: { type: 'json', nullable: true },
    spotifyToken: { type: 'json', nullable: true },
  },
});
