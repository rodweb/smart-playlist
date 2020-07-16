import { EntitySchema } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';

export interface Track extends BaseEntity {
  artist: string;
  name: string;
  album: string;
  listenedAt: string;
}

export const schema = new EntitySchema<Track, BaseEntity>({
  name: 'Track',
  extends: 'BaseEntity',
  properties: {
    artist: { type: 'string' },
    name: { type: 'string' },
    album: { type: 'string' },
    listenedAt: { type: 'Date' },
  },
});
