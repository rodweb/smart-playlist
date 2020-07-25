import dotenv from 'dotenv';
dotenv.config();

const getString = (key: string) => process.env[key] || '';
const getNumber = (key: string) => Number(getString(key)) || 0;

const env = {
  api: {
    port: getNumber('API_PORT'),
  },
  db: {
    conn: getString('DB_CONN'),
  },
  mq: {
    port: getNumber('MQ_PORT'),
    queues: {
      recentTrackFetcher: getString('MQ_RECENT_TRACK_FETCHER'),
    },
  },
  lastfm: {
    apiUrl: getString('LASTFM_API_URL'),
    apiKey: getString('LASTFM_API_KEY'),
    user: getString('LASTFM_USER'),
  },
  spotify: {
    apiUrl: getString('SPOTIFY_API_URL'),
    clientId: getString('SPOTIFY_CLIENT_ID'),
    clientSecret: getString('SPOTIFY_CLIENT_SECRET'),
    accessTokenUri: getString('SPOTIFY_ACCESS_TOKEN_URI'),
    authorizationUri: getString('SPOTIFY_AUTHORIZATION_URI'),
    redirectUri: getString('SPOTIFY_REDIRECT_URI'),
  },
  musicbrainz: {
    clientId: getString('MUSICBRAINZ_CLIENT_ID'),
    clientSecret: getString('MUSICBRAINZ_CLIENT_SECRET'),
    accessTokenUri: getString('MUSICBRAINZ_ACCESS_TOKEN_URI'),
    authorizationUri: getString('MUSICBRAINZ_AUTHORIZATION_URI'),
    redirectUrl: getString('MUSICBRAINZ_REDIRECT_URL'),
  },
};
export type EnvironmentVariables = typeof env;
export default env;
