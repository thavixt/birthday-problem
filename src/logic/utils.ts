// Returns the probability as a number between 0 and 1
export function birthdayProblem(numberOfPeople: number): number {
  if (numberOfPeople <= 1) return 0;

  let probability = 1;
  for (let i = 0; i < numberOfPeople; i++) {
      probability *= (365 - i) / 365;
  }

  return 1 - probability;
}
