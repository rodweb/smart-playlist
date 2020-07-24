import { mockInstanceOf } from '../../Mock';
import { Track } from '../Track';
import { PlayCountRule } from './PlayCountRule';
import { NumberComparison } from '../Rule';

test('should match if lower than', () => {
  const track = mockInstanceOf<Track>({ playCount: 1 });
  const rule = new PlayCountRule(NumberComparison.LowerThan, 3);
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});

test('should match if greater than', () => {
  const track = mockInstanceOf<Track>({ playCount: 1 });
  const rule = new PlayCountRule(NumberComparison.GreaterThan, 0);
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});

test('should match if equal to', () => {
  const track = mockInstanceOf<Track>({ playCount: 0 });
  const rule = new PlayCountRule(NumberComparison.EqualTo, 0);
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});
