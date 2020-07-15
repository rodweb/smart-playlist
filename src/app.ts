import { LastfmClient } from './LastfmClient';
import * as process from 'process';
import { MikroORM } from 'mikro-orm';
import ormConfig from '../mikro-orm.config';

(async () => {
  // const last = new LastfmClient(env.lastfm.key);
  // await last.getRecentTracks();
  const orm = await MikroORM.init(ormConfig);
})()
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
