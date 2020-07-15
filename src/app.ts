import dotenv from 'dotenv';
import { LastfmClient } from './LastfmClient';
dotenv.config();

const env = {
  lastfm: {
    key: process.env['LASTFM_API_KEY'] || '',
  },
};

(async () => {
  const last = new LastfmClient(env.lastfm.key);
  await last.getRecentTracks();
})()
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
