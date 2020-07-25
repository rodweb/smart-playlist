import { DateComparison, Period, DateRule } from '../Rule';

export class LastPlayedRule extends DateRule {
  constructor(comparison: DateComparison, amount: number, period: Period) {
    super(comparison, amount, period, (track) => track.lastPlayed);
  }
}
