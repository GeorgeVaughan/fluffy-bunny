import { stringToCharCounts } from "./charCounts";
import { hasDuplicateCharCounts } from "./hasDuplicateCharCounts";

describe("hasDuplicateCharCounts", () => {
  it("finds match with 2 duplicates", () => {
    const duplicates = hasDuplicateCharCounts(stringToCharCounts("soy"), [
      stringToCharCounts("soy"),
      stringToCharCounts("beans"),
    ]);
    expect(duplicates).toBeTruthy();
  });

  it("does not find match", () => {
    const duplicates = hasDuplicateCharCounts(stringToCharCounts("soy"), [
      stringToCharCounts("soybeans"),
      stringToCharCounts("beans"),
    ]);
    expect(duplicates).toBeFalsy();
  });
});
