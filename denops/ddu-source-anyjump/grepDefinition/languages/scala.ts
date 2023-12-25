import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\bval\s*KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\bval\s*JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["val test = 1234"],
  specFailed: ["case test => 1234"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\bvar\s*KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\bvar\s*JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["var test = 1234"],
  specFailed: ["case test => 1234"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\btype\s*KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\btype\s*JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["type test = 1234"],
  specFailed: ["case test => 1234"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bdef\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`\bdef\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["def test(asdf)", "def test()"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`class\s*KEYWORD\s*\(?`,
  emacsRegexp: String.raw`class\s*JJJ\s*\(?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test(object)"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`trait\s*KEYWORD\s*\(?`,
  emacsRegexp: String.raw`trait\s*JJJ\s*\(?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["trait test(object)"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`object\s*KEYWORD\s*\(?`,
  emacsRegexp: String.raw`object\s*JJJ\s*\(?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["object test(object)"],
  specFailed: [],
});
