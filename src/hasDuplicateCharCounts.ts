import { CharCounts, subCharCountMaps, isCharCountsZero } from "./charCounts";

export const hasDuplicateCharCounts = (
  charCounts: CharCounts,
  allCharCounts: CharCounts[]
): boolean =>
  allCharCounts.findIndex((otherCharCounts, i) => {
    const remainingCharCounts = subCharCountMaps(charCounts, otherCharCounts);
    if (isCharCountsZero(remainingCharCounts)) {
      return true;
    }
    return false;
  }) !== -1;
