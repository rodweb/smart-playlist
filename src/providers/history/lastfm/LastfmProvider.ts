import { HistoryProvider, Options } from '../../../HistoryProvider';
import { LastfmMapper } from './LastfmMapper';
import { LastfmClient } from './LastfmClient';
import { ListenedTrack } from '../../../ListenedTrack';
import { RecentTrackResponse } from './responses/RecentTrackResponse';

interface Args {
  apiKey: string;
}

export class LastfmProvider implements HistoryProvider {
  private mapper = new LastfmMapper();
  private client: LastfmClient;

  constructor({ apiKey }: Args) {
    this.client = new LastfmClient(apiKey);
  }

  async getRecentTracks(options: Options): Promise<ListenedTrack[]> {
    const response = await this.client.get<RecentTrackResponse>(
      'user.getRecentTracks',
      options
    );
    return this.mapper.toListenedTrack(response);
  }
}
