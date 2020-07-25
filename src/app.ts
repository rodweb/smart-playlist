import * as process from 'process';
import express from 'express';
import { MikroORM } from 'mikro-orm';
import ClientOAuth2 from 'client-oauth2';

import ormConfig from '../mikro-orm.config';
import env from './environment';
import { Login } from './entities/Login';
import { MusicBrainzApi } from 'musicbrainz-api';

let orm: MikroORM;

const app = express();
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

const musicBrainzOAuth = new ClientOAuth2({
  clientId: env.musicbrainz.clientId,
  clientSecret: env.musicbrainz.clientSecret,
  accessTokenUri: env.musicbrainz.accessTokenUri,
  authorizationUri: env.musicbrainz.authorizationUri,
  redirectUri: env.musicbrainz.redirectUrl,
  scopes: ['profile', 'email', 'rating', 'tag', 'collection'],
});

async function getToken(): Promise<ClientOAuth2.Token> {
  const repo = orm.em.getRepository<Login>('Login');
  const login = await repo.findOne({ uuid: { $ne: null } });
  if (login) {
    const user = await spotifyOAuth.createToken({ refresh_token: login.refreshToken }).refresh();
    login.refreshToken = user.refreshToken;
    await repo.persistAndFlush(login);
    return user;
  }
  throw new Error('');
  // const accessToken = login.refreshToken
}

app.get('/auth/musicbrainz', async (req, res) => {
  const uri = musicBrainzOAuth.code.getUri();
  return res.redirect(uri);
});

app.get('/auth/musicbrainz/callback', async (req, res) => {
  try {
    const user = await musicBrainzOAuth.code.getToken(req.originalUrl);
    console.log(JSON.stringify(user.data, null, 2));
    const mb = new MusicBrainzApi({
      appName: 'smartplaylist',
      appVersion: '0.1',
      appContactInfo: 'rod.apd@gmail.com',
    });
    const repo = orm.em.getRepository<Login>('Login');
    const existing = await repo.findOne({ email: 'rod.apd@gmail.com' });
    if (existing) {
      existing.musicbrainzToken = user.data;
      await repo.flush();
    } else {
      const login = repo.create({
        musicbrainzToken: user.data,
      });
      await repo.persistAndFlush(login);
    }
  } catch (err) {
    throw err;
  }
  return res.sendStatus(200);
});

app.get('/auth/spotify', async (req, res) => {
  const uri = spotifyOAuth.code.getUri();
  return res.redirect(uri);
});

app.get('/auth/spotify/callback', async (req, reply) => {
  try {
    const user = await spotifyOAuth.code.getToken(req.url);
    const { refreshToken } = user;
    // const provider = PlaylistProviderFactory.create({ accessToken, env });
    // const profile = await provider.getProfile();
    const repo = orm.em.getRepository<Login>('Login');
    const login = repo.create({
      refreshToken,
      spotifyToken: user.data,
    });
    await repo.persistAndFlush(login);
  } catch (err) {
    throw err;
  }
  return reply.send();
});

(async () => {
  orm = await MikroORM.init(ormConfig);
  // await new SmartPlaylistService(new LastfmAPI(env.lastfm.apiKey), orm).getRecentTracks(
  //   env.lastfm.user
  // );
  app.listen(env.api.port);
  // const { accessToken } = await getToken();
  // const service = new SmartPlaylistService({} as any, new SpotifyAPI(accessToken), orm);
  // await service.findTracks();
  // process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
