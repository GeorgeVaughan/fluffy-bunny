import { groupBy } from "./groupBy";

test("groupBy", () => {
  const groups = groupBy([1, 2, 3, 4], (x) => "" + (x % 2));
  expect(groups).toEqual([
    [2, 4],
    [1, 3],
  ]);
});
