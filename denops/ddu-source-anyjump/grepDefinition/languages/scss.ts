import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`@mixin\sKEYWORD\b\s*\(`,
  emacsRegexp: String.raw`@mixin\sJJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["@mixin test()"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`@function\sKEYWORD\b\s*\(`,
  emacsRegexp: String.raw`@function\sJJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["@function test()"],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`KEYWORD\s*:\s*`,
  emacsRegexp: String.raw`JJJ\s*:\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test  :"],
  specFailed: [],
});
