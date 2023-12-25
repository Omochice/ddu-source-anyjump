import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`let\s+KEYWORD\b.*\=`,
  emacsRegexp: String.raw`let\s+JJJ\b.*\=`,
  supports: ["ag", "grep", "git-grep"],
  specSuccess: [
    "let test = 1234",
    "let test() = 1234",
    "let test abc def = 1234",
  ],
  specFailed: [
    "let testnot = 1234",
    "let testnot() = 1234",
    "let testnot abc def = 1234",
  ],
});

definitions.push({
  type: "interface",
  pcre2Regexp: String.raw`member(\b.+\.|\s+)KEYWORD\b.*\=`,
  emacsRegexp: String.raw`member(\b.+\.|\s+)JJJ\b.*\=`,
  supports: ["ag", "grep", "git-grep"],
  specSuccess: ["member test = 1234", "member this.test = 1234"],
  specFailed: ["member testnot = 1234", "member this.testnot = 1234"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`type\s+KEYWORD\b.*\=`,
  emacsRegexp: String.raw`type\s+JJJ\b.*\=`,
  supports: ["ag", "grep", "git-grep"],
  specSuccess: ["type test = 1234"],
  specFailed: ["type testnot = 1234"],
});
