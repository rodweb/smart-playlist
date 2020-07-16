import { HistoryProvider } from './HistoryProvider';
import { LastfmProvider } from './providers/history/lastfm/LastfmProvider';
import env from './environment';

export class HistoryProviderFactory {
  static create(): HistoryProvider {
    return new LastfmProvider({ apiKey: env.lastfm.key });
  }
}
