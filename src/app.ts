import * as process from 'process';
import fastify from 'fastify';
import { MikroORM } from 'mikro-orm';
import ClientOAuth2 from 'client-oauth2';

import ormConfig from '../mikro-orm.config';
import env from './environment';
import { HistoryProviderFactory } from './HistoryProviderFactory';
import { Track } from './entities/Track';

const app = fastify({ logger: true });
app.get('/', async () => {
  return { hello: 'ok' };
});

const spotifyOAuth = new ClientOAuth2({
  clientId: env.spotify.clientId,
  clientSecret: env.spotify.clientSecret,
  accessTokenUri: env.spotify.accessTokenUri,
  authorizationUri: env.spotify.authorizationUri,
  redirectUri: env.spotify.redirectUri,
  scopes: ['user-read-private', 'user-read-email', 'user-read-recently-played'],
  // state: 'state',
});

app.get('/auth/spotify', async (req, reply) => {
  const uri = spotifyOAuth.code.getUri();
  return reply.redirect(uri);
});

app.get('/auth/spotify/callback', async (req, reply) => {
  console.log(req.url);
  try {
    const user = await spotifyOAuth.code.getToken(req.url);
    console.log(user);
  } catch (err) {
    throw err;
  }
  return reply.status(200);
});

const historyProvider = HistoryProviderFactory.create();
async function saveTracks(orm: MikroORM, page: number): Promise<void> {
  const tracks = await historyProvider.getRecentTracks({
    pagination: { page: 1, limit: 200 },
  });
  console.log(`${new Date()}: Found ${tracks.length} tracks (${page}).`);
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
  await app.listen(env.api.port);
  // await saveTracks(orm, 1);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
