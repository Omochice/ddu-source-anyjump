import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test == 1234:", "_test = 1234"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`def\s*KEYWORD\b\s*\(`,
  emacsRegexp: String.raw`def\s*JJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["\tdef test(asdf)", "def test()"],
  specFailed: ["\tdef testnot(asdf)", "def testnot()"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`class\s*KEYWORD\b\s*\(?`,
  emacsRegexp: String.raw`class\s*JJJ\b\s*\(?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test(object):", "class test:"],
  specFailed: ["class testnot:", "class testnot(object):"],
});
