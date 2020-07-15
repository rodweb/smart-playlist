import dotenv from 'dotenv';
dotenv.config();

const getString = (key: string) => process.env[key] || '';
// const getNumber = (key: string) => Number(getString(key));

export default {
  db: {
    conn: getString('DB_CONN')
  },
  lastfm: {
    key: getString('LASTFM_API_KEY'),
  },
};

