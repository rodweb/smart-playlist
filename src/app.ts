import * as process from 'process';
import { MikroORM } from 'mikro-orm';
import ormConfig from '../mikro-orm.config';
import { HistoryProviderFactory } from './HistoryProviderFactory';
import { Track } from './entities/Track';

const historyProvider = HistoryProviderFactory.create();
async function saveTracks(orm: MikroORM, page: number): Promise<void> {
  const tracks = await historyProvider.getRecentTracks({
    pagination: { page: 1, limit: 200 },
  });
  console.log(`${new Date()}: Found ${tracks.length} tracks.`);
  const repository = orm.em.getRepository<Track>('Track');
  const entities = tracks.map((track) =>
    repository.create({
      name: track.name,
      artist: track.artist,
      album: track.album,
      listenedAt: track.listenedAt.toISOString(),
    })
  );
  await repository.persistAndFlush(entities);

  if (tracks.length) return saveTracks(orm, page + 1);
}

(async () => {
  const orm = await MikroORM.init(ormConfig);
  await saveTracks(orm, 1);
})()
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
