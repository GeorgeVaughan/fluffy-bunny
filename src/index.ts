import { solveAnagram } from "./solveAnagram";

solveAnagram("poultry outwits ants", [
  "e4820b45d2277f3844eac66c903e84be",
  "23170acc097c24edb98fc5488ab033fe",
  "665e5bcb0c20062fe8abaaf4628bb154",
]).then((x) => console.log("Found solutions:", x));