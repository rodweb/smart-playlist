import { mockInstanceOf } from '../../Mock';
import { Track } from '../Track';
import { LastPlayedRule } from './LastPlayedRule';
import { DateComparison, Period } from '../Rule';

const d = {
  januaryFirst: new Date(2020, 0, 1),
  januaryThird: new Date(2020, 0, 3),
  januaryFourteenth: new Date(2020, 0, 14),
  februaryFirst: new Date(2020, 1, 1),
  aprilFirst: new Date(2020, 3, 1),
};

test('should match last x days', () => {
  const track = mockInstanceOf<Track>({ lastPlayed: d.januaryFirst });
  const rule = new LastPlayedRule(DateComparison.Last, 2, Period.Days);
  rule.getCurrentDate = () => d.januaryThird;
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});

it('should match last x weeks', () => {
  const track = mockInstanceOf<Track>({ lastPlayed: d.januaryFirst });
  const rule = new LastPlayedRule(DateComparison.Last, 2, Period.Weeks);
  rule.getCurrentDate = () => d.januaryFourteenth;
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});

it('should match last x months', () => {
  const track = mockInstanceOf<Track>({ lastPlayed: d.januaryFirst });
  const rule = new LastPlayedRule(DateComparison.Last, 3, Period.Months);
  rule.getCurrentDate = () => d.aprilFirst;
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});

it('should match last x years', () => {
  const track = mockInstanceOf<Track>({ lastPlayed: d.januaryFirst });
  const rule = new LastPlayedRule(DateComparison.Last, 1, Period.Years);
  rule.getCurrentDate = () => new Date(2021, 0, 1);
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});
