import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\s*type\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*type\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["type test is", "type test  is"],
  specFailed: ["type testing is", "type test2  is"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\s*constant\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*constant\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["constant test :", "constant test:"],
  specFailed: ["constant testing ", "constant test2:"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`function\s*\"?KEYWORD\"?\s*\(`,
  emacsRegexp: String.raw`function\s*\"?JJJ\"?\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function test(signal)",
    "function test (signal)",
    'function "test" (signal)',
  ],
  specFailed: ["function testing(signal"],
});
