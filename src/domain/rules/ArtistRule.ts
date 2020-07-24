import { TextComparison, TextRule } from '../Rule';

export class ArtistRule extends TextRule {
  constructor(comparison: TextComparison, reference: string) {
    super(comparison, reference, (track) => track.artist);
  }
}
