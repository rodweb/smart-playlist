import { EntitySchema } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';

export interface Track extends BaseEntity {
  artist: string;
  name: string;
  album: string;
  lastPlayed?: Date;
}

export const schema = new EntitySchema<Track, BaseEntity>({
  name: 'Track',
  extends: 'BaseEntity',
  properties: {
    artist: { type: 'string' },
    name: { type: 'string' },
    album: { type: 'string' },
    lastPlayed: { type: 'Date', nullable: true },
  },
});
