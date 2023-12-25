import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*`,
  emacsRegexp: String.raw`function\s*JJJ\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["function test{", "function test {", "function test () {"],
  specFailed: ["function nottest {"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`KEYWORD\(\)\s*\{`,
  emacsRegexp: String.raw`JJJ\(\)\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test() {"],
  specFailed: ["testx() {"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\bKEYWORD\s*=\s*`,
  emacsRegexp: String.raw`\bJJJ\s*=\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["blahtest = 1234"],
});
