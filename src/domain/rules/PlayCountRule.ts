import { NumberComparison, NumberRule } from '../Rule';

export class PlayCountRule extends NumberRule {
  constructor(comparison: NumberComparison, playCount: number) {
    super(comparison, playCount, (track) => track.playCount);
  }
}
