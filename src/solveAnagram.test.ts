import { solveAnagram } from "./solveAnagram";
import md5 from "md5";

test("solveAnagram", async () => {
  const solutions = await solveAnagram("hello", [md5("he lol")]);
  expect(solutions.sort()).toEqual(["he lol"].sort());
});
