import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\((local|var)\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\((local|var)\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(local test (foo)", "(var test (foo)"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(fn\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(fn\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(fn test [foo]"],
  specFailed: ["(fn test? [foo]"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(macro\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(macro\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(macro test [foo]"],
  specFailed: [],
});
