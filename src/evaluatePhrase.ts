import md5 from "md5";

type EvaluatePhraseParams = {
  md5Hashes: string[];
  phrase: string[][];
  phraseOrder?: string[];
};

export const evaluatePhrase = ({
  phrase,
  md5Hashes,
  phraseOrder = [],
}: EvaluatePhraseParams): string[] => {
  const head = phrase[0];
  if (head === undefined) {
    const phraseString = phraseOrder.join(" ");
    return md5Hashes.includes(md5(phraseString)) ? [phraseString] : [];
  }
  const tail = phrase.slice(1);
  return head.flatMap((x) =>
    [...phraseOrder, x].flatMap((_, i) =>
      evaluatePhrase({
        phrase: tail,
        md5Hashes,
        phraseOrder: [...phraseOrder.slice(0, i), x, ...phraseOrder.slice(i)],
      })
    )
  );
};
