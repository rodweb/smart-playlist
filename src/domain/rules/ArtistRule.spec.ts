import { mockInstanceOf } from '../../Mock';
import { Track } from '../Track';
import { ArtistRule } from './ArtistRule';
import { TextComparison } from '../Rule';

test('should match by exact name', () => {
  const track = mockInstanceOf<Track>({ artist: 'exact' });
  const rule = new ArtistRule(TextComparison.Exact, 'exact');
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});

test('should match by partial name', () => {
  const track = mockInstanceOf<Track>({ artist: 'partial name' });
  const rule = new ArtistRule(TextComparison.Partial, 'partial');
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});

test('should match by different name', () => {
  const track = mockInstanceOf<Track>({ artist: 'other' });
  const rule = new ArtistRule(TextComparison.Different, 'one');
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});
