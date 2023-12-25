import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\b\s*KEYWORD\s*=[^=;]+`,
  emacsRegexp: String.raw`\b\s*JJJ\s*=[^=;]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234;", "test = 123;", "test=123"],
  specFailed: ["testNot = 1234;", "Nottest = 1234;", "AtestNot = 1234;"],
});
