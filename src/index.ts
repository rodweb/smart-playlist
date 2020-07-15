interface Album {

}

interface Artist {

}

interface Track {
  title: string;
  liked: boolean;
  scrobble: {
    count: number;
    first?: Date;
    last?: Date;
  }
}

interface Playlist {

}

// classification
// last scrobble
// first scrobble
// artist
// scrobble count

enum Comparison {
  GreaterThan,
  LessThan,
}

function getOperator(op: Comparison) {
  switch (op) {
    case Comparison.GreaterThan: return (a: number, b: number) => a > b;
    default: throw new Error();
  }
}

abstract class Rule<T> {
  abstract isSatisfiedBy(entity: T): boolean;
}

class ScrobbleCountRule extends Rule<Track> {
  private readonly compare: (a: number, b: number) => boolean;
  constructor(private operator: Comparison, private count: number) {
    super();
    this.compare = getOperator(operator);
  }
  isSatisfiedBy(track: Track): boolean {
    return this.compare(track.scrobble.count, this.count);
  }
}

// normalize track names
