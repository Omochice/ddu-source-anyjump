import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`sub\s*KEYWORD\s*(\{|\()`,
  emacsRegexp: String.raw`sub\s*JJJ\s*(\{|\()`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["sub test{", "sub test {", "sub test(", "sub test ("],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`KEYWORD\s*=\s*`,
  emacsRegexp: String.raw`JJJ\s*=\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["$test = 1234"],
  specFailed: [],
});
