import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*\([^()]*\)\s*[{]`,
  emacsRegexp: String.raw`\bJJJ\s*\([^()]*\)\s*[{]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test(foo) {", "test (foo){", "test(foo){"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`class\s*KEYWORD\s*[\(\{]`,
  emacsRegexp: String.raw`class\s*JJJ\s*[\(\{]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test(object) {", "class test{"],
  specFailed: [],
});
