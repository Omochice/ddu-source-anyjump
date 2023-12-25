import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`^KEYWORD\b\s*\(`,
  emacsRegexp: String.raw`^JJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "test() ->",
    "test()->",
    "test(Foo) ->",
    "test (Foo,Bar) ->",
    "test(Foo, Bar)->",
  ],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*KEYWORD\s*=[^:=\n]+`,
  emacsRegexp: String.raw`\s*JJJ\s*=[^:=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test =:= 1234", "if test == 1234"],
});

definitions.push({
  type: "module",
  pcre2Regexp: String.raw`^-module\(KEYWORD\)`,
  emacsRegexp: String.raw`^-module\(JJJ\)`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["-module(test)."],
  specFailed: [],
});
