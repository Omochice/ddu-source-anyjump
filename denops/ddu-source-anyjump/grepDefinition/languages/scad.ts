import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test == 1234 {"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["function test()", "function test ()"],
  specFailed: [],
});

definitions.push({
  type: "module",
  pcre2Regexp: String.raw`module\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`module\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["module test()", "module test ()"],
  specFailed: [],
});
