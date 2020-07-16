import env from './src/environment';
import { Options } from 'mikro-orm';

const config: Options = {
  entitiesDirs: ['./src/entities/**'],
  type: 'postgresql',
  clientUrl: env.db.conn,
  migrations: {
    tableName: 'migrations',
  },
};
export default config;
