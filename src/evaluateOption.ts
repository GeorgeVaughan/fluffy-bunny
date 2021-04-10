import {
  CharCounts,
  subCharCountMaps,
  isCharCountsValid,
  isCharCountsZero,
} from "./charCounts";
import { evaluatePhrase } from "./evaluatePhrase";

export type Option = {
  charCounts: CharCounts;
  values: string[];
};

export type EvaluateOptionParams = {
  option: Option;
  availableOptions: Option[];
  remainingAnagram: CharCounts;
  md5Hashes: string[];
  phrase?: string[][];
  depth?: number;
};

export const evaluateOption = ({
  option,
  availableOptions,
  remainingAnagram,
  md5Hashes,
  phrase = [],
  depth = 0,
}: EvaluateOptionParams): string[] => {
  const { charCounts } = option;
  const nextRemainingAnagram = subCharCountMaps(remainingAnagram, charCounts);
  if (!isCharCountsValid(nextRemainingAnagram)) {
    return [];
  }
  if (isCharCountsZero(nextRemainingAnagram)) {
    return evaluatePhrase({
      phrase: [...phrase, option.values],
      md5Hashes,
    });
  }
  if (depth === 3) {
    return [];
  }
  return availableOptions.flatMap((nextOption, i) =>
    evaluateOption({
      option: nextOption,
      availableOptions: availableOptions.slice(i),
      remainingAnagram: nextRemainingAnagram,
      md5Hashes,
      phrase: [...phrase, option.values],
      depth: depth + 1,
    })
  );
};
