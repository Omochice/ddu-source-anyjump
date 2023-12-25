import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`^\s*(and|type)\s+.*\bKEYWORD\b`,
  emacsRegexp: String.raw`^\s*(and|type)\s+.*\bJJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: [
    "type test =",
    "and test =",
    "type 'a test =",
    "type ('a, _, 'c) test",
  ],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`let\s+KEYWORD\b`,
  emacsRegexp: String.raw`let\s+JJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["let test =", "let test x y ="],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`let\s+rec\s+KEYWORD\b`,
  emacsRegexp: String.raw`let\s+rec\s+JJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["let rec test =", "let rec  test x y ="],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*val\s*\bKEYWORD\b\s*`,
  emacsRegexp: String.raw`\s*val\s*\bJJJ\b\s*`,
  supports: ["ag", "rg"],
  specSuccess: ["val test"],
  specFailed: [],
});

definitions.push({
  type: "module",
  pcre2Regexp: String.raw`^\s*module\s*\bKEYWORD\b`,
  emacsRegexp: String.raw`^\s*module\s*\bJJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["module test ="],
  specFailed: [],
});

definitions.push({
  type: "module",
  pcre2Regexp: String.raw`^\s*module\s*type\s*\bKEYWORD\b`,
  emacsRegexp: String.raw`^\s*module\s*type\s*\bJJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["module type test ="],
  specFailed: [],
});
