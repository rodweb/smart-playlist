import { mockInstanceOf } from '../../Mock';
import { Track } from '../Track';
import { AlbumRule } from './AlbumRule';
import { TextComparison } from '../Rule';

test('should match by exact name', () => {
  const track = mockInstanceOf<Track>({ album: 'exact' });
  const rule = new AlbumRule(TextComparison.Exact, 'exact');
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});

test('should match by partial name', () => {
  const track = mockInstanceOf<Track>({ album: 'partial name' });
  const rule = new AlbumRule(TextComparison.Partial, 'partial');
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});

test('should match by different name', () => {
  const track = mockInstanceOf<Track>({ album: 'other' });
  const rule = new AlbumRule(TextComparison.Different, 'one');
  expect(rule.isSatisfiedBy(track)).toBeTruthy();
});
