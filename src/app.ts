import * as process from 'process';
import fastify from 'fastify';
import { MikroORM } from 'mikro-orm';
import ClientOAuth2 from 'client-oauth2';

import ormConfig from '../mikro-orm.config';
import env from './environment';
import { HistoryProviderFactory } from './HistoryProviderFactory';
import { Track } from './infrastructure/entities/Track';
import { Login } from './infrastructure/entities/Login';
import { PlaylistProviderFactory } from './PlaylistProviderFactory';

let orm: MikroORM;

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
  scopes: [
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
  ],
  // state: 'state',
});

async function getToken(): Promise<ClientOAuth2.Token> {
  const repo = orm.em.getRepository<Login>('Login');
  const login = await repo.findOne({ uuid: { $ne: null } });
  if (login) {
    const user = await spotifyOAuth
      .createToken({ refresh_token: login.refreshToken })
      .refresh();
    login.refreshToken = user.refreshToken;
    await repo.persistAndFlush(login);
    return user;
  }
  throw new Error('');
  // const accessToken = login.refreshToken
}

app.get('/auth/spotify', async (req, reply) => {
  const uri = spotifyOAuth.code.getUri();
  return reply.redirect(uri);
});

app.get('/auth/spotify/callback', async (req, reply) => {
  console.log(req.url);
  try {
    const user = await spotifyOAuth.code.getToken(req.url);
    const { refreshToken } = user;
    // const provider = PlaylistProviderFactory.create({ accessToken, env });
    // const profile = await provider.getProfile();
    const repo = orm.em.getRepository<Login>('Login');
    const login = repo.create({
      refreshToken,
    });
    await repo.persistAndFlush(login);
  } catch (err) {
    throw err;
  }
  return reply.send();
});

app.get('/playlists', async (req, reply) => {
  const { accessToken } = await getToken();
  const provider = PlaylistProviderFactory.create({ env, accessToken });
  const playlists = await provider.getPlaylists();
  return reply.send(playlists);
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
  orm = await MikroORM.init(ormConfig);
  await app.listen(env.api.port);
  // await saveTracks(orm, 1);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
