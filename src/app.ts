import { LastfmClient } from './LastfmClient';
import * as process from 'process';
import { MikroORM } from 'mikro-orm';
import ormConfig from '../mikro-orm.config';
import env from './environment';

(async () => {
  const orm = await MikroORM.init(ormConfig);
  const last = new LastfmClient(env.lastfm.key);
  await last.getRecentTracks({ limit: 10, page: 1 });
})()
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
