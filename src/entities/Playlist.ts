import { EntitySchema } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';
import { Track } from './Track';

export interface Playlist extends BaseEntity {
  provider: string;
  name: string;
  description?: string;
  tracks: Track[];
}

export const schema = new EntitySchema<Playlist, BaseEntity>({
  name: 'Playlist',
  extends: 'BaseEntity',
  properties: {
    provider: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string', nullable: true },
    tracks: { reference: 'm:n', entity: 'Track' },
  },
});
