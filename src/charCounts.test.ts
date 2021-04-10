import {
  stringToCharCounts,
  isCharCountsValid,
  isCharCountsZero,
  subCharCountMaps,
  charCountsSize,
  charCountsEqual,
  addCharCountMaps,
} from "./charCounts";

test("stringToCharCounts", () => {
  const charCount = stringToCharCounts("hello");
  expect(charCount).toEqual({ h: 1, e: 1, l: 2, o: 1 });
});

test("isCharCountsValid", () => {
  const charCount = stringToCharCounts("hello");
  expect(isCharCountsValid(charCount)).toBeTruthy();
});

test("isCharCountsZero", () => {
  const charCount = stringToCharCounts("hello");
  expect(isCharCountsZero(charCount)).toBeFalsy();
  expect(isCharCountsZero(subCharCountMaps(charCount, charCount))).toBeTruthy();
});

test("addCharCountMaps", () => {
  const lhs = stringToCharCounts("hello");
  const rhs = stringToCharCounts("world");
  expect(addCharCountMaps(lhs, rhs)).toEqual({
    h: 1,
    e: 1,
    l: 3,
    o: 2,
    w: 1,
    r: 1,
    d: 1,
  });
});

test("subCharCountMaps", () => {
  const lhs = stringToCharCounts("hello");
  const rhs = stringToCharCounts("world");
  expect(subCharCountMaps(lhs, rhs)).toEqual({
    h: 1,
    e: 1,
    l: 1,
    o: 0,
    w: -1,
    r: -1,
    d: -1,
  });
});

test("charCountsEqual", () => {
  const equal = charCountsEqual(
    stringToCharCounts("hello"),
    stringToCharCounts("hello")
  );
  expect(equal).toBeTruthy();
});

test("charCountsSize", () => {
  const size = charCountsSize(stringToCharCounts("hello"));
  expect(size).toBe(5);
});
