import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`(const|let|var)\s*KEYWORD\*?\s*(=|:)[^=:\n]+`,
  emacsRegexp: String.raw`(const|let|var)\s*JJJ\*?\s*(=|:)[^=:\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "let test = 1234",
    "var test = 1234",
    "var test: Stat",
    "const test = 1234",
    "const test* = 1234",
  ],
  specFailed: ["if test == 1234:"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`(proc|func|macro|template)\s*\`?KEYWORD\`?\b\*?\s*\(`,
  emacsRegexp: String.raw`(proc|func|macro|template)\s*\`?JJJ\`?\b\*?\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "\tproc test(asdf)",
    "proc test()",
    "func test()",
    "macro test()",
    "template test()",
    "proc test*()",
  ],
  specFailed: ["\tproc testnot(asdf)", "proc testnot()"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`type\s*KEYWORD\b\*?\s*(\{[^}]+\})?\s*=\s*\w+`,
  emacsRegexp: String.raw`type\s*JJJ\b\*?\s*(\{[^}]+\})?\s*=\s*\w+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "type test = object",
    "type test {.pure.} = enum",
    "type test* = ref object",
  ],
  specFailed: ["type testnot = object"],
});
