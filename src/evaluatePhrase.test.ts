import md5 from "md5";
import { evaluatePhrase } from "./evaluatePhrase";

describe("evaluatePhrase", () => {
  it("finds the match centered in 2d arrays", () => {
    const match = evaluatePhrase({
      phrase: [
        ["c", "hel", "d"],
        ["a", "lo", "b"],
      ],
      md5Hashes: [md5("hel lo")],
    });
    expect(match).toEqual(["hel lo"]);
  });
  it("finds match reversed and centered in 2d arrays", () => {
    const match = evaluatePhrase({
      phrase: [
        ["a", "lo", "b"],
        ["c", "hel", "d"],
      ],
      md5Hashes: [md5("hel lo")],
    });
    expect(match).toEqual(["hel lo"]);
  });
});
