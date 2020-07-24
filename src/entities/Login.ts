import { EntitySchema } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';

export interface Login extends BaseEntity {
  refreshToken: string;
}

export const schema = new EntitySchema<Login, BaseEntity>({
  name: 'Login',
  extends: 'BaseEntity',
  properties: {
    refreshToken: { type: 'string' },
  },
});
