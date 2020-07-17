import dotenv from 'dotenv';
dotenv.config();

const getString = (key: string) => process.env[key] || '';
const getNumber = (key: string) => Number(getString(key)) || 0;

const environmentVariables = {
  api: {
    port: getNumber('API_PORT'),
  },
  db: {
    conn: getString('DB_CONN'),
  },
  lastfm: {
    apiUrl: getString('LASTFM_API_URL'),
    apiKey: getString('LASTFM_API_KEY'),
  },
  spotify: {
    apiUrl: getString('SPOTIFY_API_URL'),
    clientId: getString('SPOTIFY_CLIENT_ID'),
    clientSecret: getString('SPOTIFY_CLIENT_SECRET'),
    accessTokenUri: getString('SPOTIFY_ACCESS_TOKEN_URI'),
    authorizationUri: getString('SPOTIFY_AUTHORIZATION_URI'),
    redirectUri: getString('SPOTIFY_REDIRECT_URI'),
  },
};
export type EnvironmentVariables = typeof environmentVariables;
export default environmentVariables;
