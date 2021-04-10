import fs from "fs";
import os from "os";
import { Worker } from "worker_threads";
import {
  CharCounts,
  stringToCharCounts,
  subCharCountMaps,
  isCharCountsValid,
  isCharCountsZero,
  charCountsEqual,
} from "./charCounts";
import { evaluateOption, EvaluateOptionParams, Option } from "./evaluateOption";
import { groupBy } from "./groupBy";
import { hasDuplicateCharCounts } from "./hasDuplicateCharCounts";

const words = fs
  .readFileSync("./src/wordlist.txt")
  .toString()
  .split("\n")
  .filter((x) => x.length > 1 || x === "a" || x === "i");

type Word = {
  value: string;
  charCounts: CharCounts;
};

export const solveAnagram = (anagramString: string, md5Hashes: string[]) => {
  const anagram = stringToCharCounts(anagramString.replace(/ /gi, ""));

  const stringToWord = (value: string): Word => ({
    value,
    charCounts: stringToCharCounts(value),
  });

  const viableWord = ({ charCounts }: Word) =>
    isCharCountsValid(subCharCountMaps(anagram, charCounts)) &&
    !isCharCountsZero(charCounts);

  const viableWords: Word[] = words
    .map(stringToWord)
    .filter(viableWord)
    .filter(({ value }, i, a) => a.findIndex((x) => x.value === value) === i)
    .sort((l, r) => r.value.length - l.value.length);

  const viableCharCounts: CharCounts[] = viableWords
    .map((x) => x.charCounts)
    .filter(
      (charCounts, i, list) =>
        !hasDuplicateCharCounts(charCounts, list.slice(i + 1))
    );

  const viableOptions: Option[] = viableCharCounts.map((charCounts) => ({
    charCounts,
    values: viableWords
      .filter((x) => charCountsEqual(charCounts, x.charCounts))
      .map((x) => x.value),
  }));

  console.log(
    `Evaluating ${viableOptions.length} unique char count options...`
  );

  const cores = os.cpus().length;
  const evaluateOptionParams: EvaluateOptionParams[] = viableOptions.map(
    (option, i, a) => ({
      option,
      availableOptions: a.slice(i),
      remainingAnagram: anagram,
      md5Hashes,
    })
  );
  const processGroups = groupBy(evaluateOptionParams, (_, i) =>
    (i % cores).toString()
  );

  return Promise.all(
    processGroups.flatMap(
      (params) =>
        new Promise(
          (
            resolve: (value: ReturnType<typeof evaluateOption>) => void,
            reject
          ) => {
            const worker = new Worker("./worker.js", {
              workerData: {
                params,
                path: "./src/evaluateOptionWorker.ts",
              },
            });
            worker.on("message", resolve);
            worker.on("error", reject);
            worker.on("exit", (code) => {
              if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
              }
            });
          }
        )
    )
  ).then((sol) => sol.flat().filter((x) => x !== undefined));
};
