import { Track } from './Track';
import { mockInstanceOf } from '../Mock';

abstract class Rule {
  abstract isSatisfiedBy(track: Track): boolean;
}

class AlwaysSatisfiedRule implements Rule {
  isSatisfiedBy(): boolean {
    return true;
  }
}

class AlwaysUnsatisfiedRule implements Rule {
  isSatisfiedBy(): boolean {
    return false;
  }
}

describe('Rule', () => {
  describe('#isSatisfiedBy', () => {
    it('should return true when rule is satisfied', () => {
      const rule = new AlwaysSatisfiedRule();
      expect(rule.isSatisfiedBy()).toBeTruthy();
    });

    it('should return false when rule is unsatisfied', () => {
      const rule = new AlwaysUnsatisfiedRule();
      expect(rule.isSatisfiedBy()).toBeFalsy();
    });
  });
});

type LogicalOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'ne';

const logicalComparators: Record<LogicalOperator, (a: any, b: any) => boolean> = {
  gt: (a, b) => a > b,
  gte: (a, b) => a >= b,
  lt: (a, b) => a < b,
  lte: (a, b) => a <= b,
  eq: (a, b) => a <= b,
  ne: (a, b) => a != b,
};

class LastPlayedRule extends Rule {
  constructor(private operator: LogicalOperator, private value: Date) {
    super();
  }
  isSatisfiedBy(track: Track): boolean {
    const comparator = logicalComparators[this.operator];
    return comparator(track.lastPlayed, this.value);
  }
}

const d = {
  januaryFirst: new Date(2020, 0, 1),
  februaryFirst: new Date(2020, 1, 1),
};

describe('LastPlayedRule', () => {
  describe('when looking for recent tracks', () => {
    it('should return true', () => {
      const rule = new LastPlayedRule('gt', d.januaryFirst);
      const track = mockInstanceOf<Track>({ lastPlayed: d.februaryFirst });
      expect(rule.isSatisfiedBy(track)).toBeTruthy();
    });
  });
});

// last played in the last x [days, weeks, months, years]

// album
// artist
// plays
// playlist
// first played
// last played
// liked
// classification?
// bmp?
// genre
// album rating
// release year

// select by
// most/least recently played
// most/least often played
// most/least recently played for the first time
// random?
// artist
// album
// name
// genre?
// rating?
