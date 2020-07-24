import { EntitySchema } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';

export interface PlayHistory extends BaseEntity {
  provider: string;
  data: any;
  playedAt: Date;
}

export const schema = new EntitySchema<PlayHistory, BaseEntity>({
  name: 'PlayHistory',
  extends: 'BaseEntity',
  properties: {
    provider: { type: 'string' },
    playedAt: { type: 'Date' },
    data: { type: 'json' },
  },
  indexes: [
    {
      properties: ['playedAt'],
    },
  ],
});
