import * as process from 'process';
import { MikroORM } from 'mikro-orm';
import ormConfig from '../mikro-orm.config';
import { HistoryProviderFactory } from './HistoryProviderFactory';

(async () => {
  await MikroORM.init(ormConfig);
  const historyProvider = HistoryProviderFactory.create();
  const tracks = await historyProvider.getRecentTracks({
    pagination: { page: 1, limit: 10 },
  });
  console.log(JSON.stringify(tracks, null, 2));
})()
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
