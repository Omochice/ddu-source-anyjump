import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "message",
  pcre2Regexp: String.raw`message\s+KEYWORD\s*\{`,
  emacsRegexp: String.raw`message\s+JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["message test{", "message test {"],
  specFailed: [],
});

definitions.push({
  type: "enum",
  pcre2Regexp: String.raw`enum\s+KEYWORD\s*\{`,
  emacsRegexp: String.raw`enum\s+JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["enum test{", "enum test {"],
  specFailed: [],
});
