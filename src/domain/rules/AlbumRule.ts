import { TextComparison, TextRule } from '../Rule';

export class AlbumRule extends TextRule {
  constructor(comparison: TextComparison, reference: string) {
    super(comparison, reference, (track) => track.album);
  }
}
