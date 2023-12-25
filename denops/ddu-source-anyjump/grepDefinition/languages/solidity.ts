import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function test() internal",
    "function test (uint x, address y)",
    "function test() external",
  ],
  specFailed: [],
});

definitions.push({
  type: "modifier",
  pcre2Regexp: String.raw`modifier\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`modifier\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["modifier test()", "modifier test ()"],
  specFailed: [],
});

definitions.push({
  type: "event",
  pcre2Regexp: String.raw`event\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`event\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "event test();",
    "event test (uint indexed x)",
    "event test(uint x, address y)",
  ],
  specFailed: [],
});

definitions.push({
  type: "error",
  pcre2Regexp: String.raw`error\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`error\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "error test();",
    "error test (uint x)",
    "error test(uint x, address y)",
  ],
  specFailed: [],
});
