import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bfunction\s+KEYWORD\b`,
  emacsRegexp: String.raw`\bfunction\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["  function test : "],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bprocedure\s+KEYWORD\b`,
  emacsRegexp: String.raw`\bprocedure\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["  procedure test ; "],
  specFailed: [],
});
