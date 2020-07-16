import { EntitySchema } from 'mikro-orm';
import { v4 } from 'uuid';

export interface BaseEntity {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

export const schema = new EntitySchema<BaseEntity>({
  name: 'BaseEntity',
  abstract: true,
  properties: {
    uuid: { type: 'uuid', primary: true, onCreate: () => v4() },
    createdAt: { type: 'Date', onCreate: () => new Date(), nullable: true },
    updatedAt: { type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true },
  },
});
