export type CharCounts = Record<string, number>;

export const stringToCharCounts = (s: string) =>
  s
    .split("")
    .reduce<CharCounts>(
      (prev, curr) => ({ ...prev, [curr]: (prev[curr] || 0) + 1 }),
      {}
    );

export const isCharCountsValid = (counts: CharCounts) => {
  return Object.values(counts).find((x) => x < 0) === undefined;
};

export const isCharCountsZero = (counts: CharCounts) => {
  return Object.values(counts).find((x) => x !== 0) === undefined;
};

export const addCharCountMaps = (lhs: CharCounts, rhs: CharCounts) => {
  let combined = { ...lhs };
  Object.entries(rhs).forEach(
    ([key, value]) => (combined[key] = (combined[key] || 0) + value)
  );
  return combined;
};

export const subCharCountMaps = (lhs: CharCounts, rhs: CharCounts) => {
  let combined = { ...lhs };
  Object.entries(rhs).forEach(
    ([key, value]) => (combined[key] = (combined[key] || 0) - value)
  );
  return combined;
};

export const charCountsEqual = (lhs: CharCounts, rhs: CharCounts) =>
  isCharCountsZero(subCharCountMaps(lhs, rhs));

export const charCountsSize = (counts: CharCounts) => {
  return Object.values(counts).reduce((l, r) => l + r, 0);
};
