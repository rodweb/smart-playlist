import { LastfmAPI } from './LastfmAPI';
import { AbstractSqlConnection, MikroORM } from 'mikro-orm';
import { PlayHistory } from './entities/PlayHistory';
import { SpotifyAPI } from './SpotifyAPI';
import { Track } from './entities/Track';
import { RecentTracks } from './lastfm/RecentTracks';

async function fetchAll<T>(
  iterator: IterableIterator<T>,
  fn: (item: T) => Promise<void>
): Promise<void> {
  for (const item of iterator) {
    await fn(item);
  }
}

const toDate = (uts: string) => new Date(+uts * 1000);
const fromDate = (date: Date) => date.getTime() / 1000;

export class SmartPlaylistService {
  constructor(
    private lastfmClient: LastfmAPI,
    private spotifyClient: SpotifyAPI,
    private orm: MikroORM
  ) {}

  async getRecentTracks(user: string) {
    function* iterator(totalResults: number, limit: number) {
      let page = Math.ceil(totalResults / limit);
      while (page > 0) yield page--;
    }
    // get current user
    // get last timestamp
    const conn = this.orm.em.getConnection() as AbstractSqlConnection;
    // TODO: filter by provider
    const query = conn.getKnex().from('play_history').max('played_at').count().toQuery();
    // const qb = this.orm.em.createQueryBuilder<PlayHistory>('PlayHistory');
    // const query = qb.getKnexQuery().max('played_at').toQuery();
    const [{ max: timestamp, count: playCount }] = await this.orm.em.getConnection().execute(query);
    // loop until no results

    const response = await this.lastfmClient.getRecentTracks({
      user,
      limit: 1,
      ...(timestamp && { from: fromDate(timestamp) }),
    });
    const missingPlayCount = +response.recenttracks['@attr'].total;
    const limit = 200;
    await fetchAll(iterator(missingPlayCount, limit), async (page) => {
      console.log(`Running page ${page}`);
      const response = await this.lastfmClient.getRecentTracks({
        user,
        limit,
        page,
        extended: 1,
        ...(timestamp && { from: fromDate(timestamp) }),
      });
      const repo = this.orm.em.getRepository<PlayHistory>('PlayHistory');
      const recentTracks = response.recenttracks.track
        .map((track) => ({
          provider: 'lastfm',
          data: track,
          playedAt: toDate(track.date.uts),
        }))
        .map((play) => repo.create(play));
      await repo.persistAndFlush(recentTracks);
      console.log(recentTracks[0].playedAt);
    });
  }

  async findTracks() {
    const recentRepo = this.orm.em.getRepository<PlayHistory>('PlayHistory');
    const recentTracks = await recentRepo.findAll({
      // where: {},
      orderBy: { playedAt: 'ASC' },
      limit: 1,
    });
    const recentTrack: RecentTracks['recenttracks']['track'][0] = recentTracks[0].data;
    const query = `track:${recentTrack.name} artist:${recentTrack.artist.name} album:${recentTrack.album['#text']}`;
    const response = await this.spotifyClient.search(query, ['track']);
    const trackRepo = this.orm.em.getRepository<Track>('Track');
    const tracks = response.tracks.items.map((track) => ({
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      isrc: track.external_ids.isrc,
      uri: track.uri,
      id: track.id,
    }));
    // .map((track) => trackRepo.create(track));
    tracks.forEach((track) => console.log(JSON.stringify(track)));
    return tracks;
  }
}
