import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`proc\s+KEYWORD\s*\{`,
  emacsRegexp: String.raw`proc\s+JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["proc test{", "proc test {"],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`set\s+KEYWORD`,
  emacsRegexp: String.raw`set\s+JJJ`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["set test 1234"],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`(variable|global)\s+KEYWORD`,
  emacsRegexp: String.raw`(variable|global)\s+JJJ`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["variable test", "global test"],
  specFailed: [],
});
