import { birthdayProblem } from './utils';
import { expect, test } from 'vitest';

test('should return 0 for 0 people', () => {
  expect(birthdayProblem(0)).toBe(0);
});

test('should return 0 for 1 person', () => {
  expect(birthdayProblem(1)).toBe(0);
});

test('should return a probability close to 0.03 for 10 people', () => {
  const result = birthdayProblem(10);
  expect(result).toBeCloseTo(0.11694817771107768, 5);
});

test('should return a probability close to 0.97 for 50 people', () => {
  const result = birthdayProblem(50);
  expect(result).toBeCloseTo(0.9703735795779884, 5);
});

test('should return a probability close to 1 for 100 people', () => {
  const result = birthdayProblem(100);
  expect(result).toBeCloseTo(1, 5);
});