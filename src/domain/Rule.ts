import { Track } from './Track';

export abstract class Rule {
  abstract isSatisfiedBy(track: Track): boolean;
}

export enum TextComparison {
  Exact,
  Partial,
  Different,
}

interface TextComparator {
  (reference: string, value: string): boolean;
}

const textComparators: Record<TextComparison, TextComparator> = {
  [TextComparison.Exact]: (reference, value) => reference === value,
  [TextComparison.Partial]: (reference, value) => value.includes(reference),
  [TextComparison.Different]: (reference, value) => reference !== value,
};

export abstract class TextRule extends Rule {
  protected constructor(
    private comparison: TextComparison,
    private reference: string,
    private getValue: (track: Track) => string
  ) {
    super();
  }
  isSatisfiedBy(track: Track): boolean {
    return textComparators[this.comparison](this.reference, this.getValue(track));
  }
}

export enum NumberComparison {
  LowerThan,
  EqualTo,
  GreaterThan,
}

interface NumberComparator {
  (reference: number, value: number): boolean;
}

const numberComparators: Record<NumberComparison, NumberComparator> = {
  [NumberComparison.EqualTo]: (reference, value) => value === reference,
  [NumberComparison.LowerThan]: (reference, value) => value < reference,
  [NumberComparison.GreaterThan]: (reference, value) => value > reference,
};

export abstract class NumberRule extends Rule {
  protected constructor(
    private comparison: NumberComparison,
    private reference: number,
    private getValue: (track: Track) => number
  ) {
    super();
  }
  isSatisfiedBy(track: Track): boolean {
    return numberComparators[this.comparison](this.reference, this.getValue(track));
  }
}
