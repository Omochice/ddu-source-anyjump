import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\bKEYWORD\s*=[^=><]`,
  emacsRegexp: String.raw`\bJJJ\s*=[^=><]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if (test == 1234)"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*<-\s*function\b`,
  emacsRegexp: String.raw`\bJJJ\s*<-\s*function\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test <- function", "test <- function("],
  specFailed: ["test <- functionX"],
});
