import { Track } from './Track';
import sub from 'date-fns/sub';

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

export enum DateComparison {
  Last,
}

export enum Period {
  Days = 'days',
  Weeks = 'weeks',
  Months = 'months',
  Years = 'years',
}

export abstract class DateRule extends Rule {
  getCurrentDate = () => new Date();

  protected constructor(
    private comparison: DateComparison,
    private amount: number,
    private period: Period,
    private getValue: (track: Track) => Date | undefined
  ) {
    super();
  }
  isSatisfiedBy(track: Track): boolean {
    const value = this.getValue(track);
    if (!value) return false;

    if (this.comparison === DateComparison.Last) {
      const minimum = sub(this.getCurrentDate(), { [this.period]: this.amount });
      return value >= minimum;
    }
    return false;
  }
}
