import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`^\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`^\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["for test = 1:2:", "_test = 1234"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`^\s*function\s*[^=]+\s*=\s*KEYWORD\b`,
  emacsRegexp: String.raw`^\s*function\s*[^=]+\s*=\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "\tfunction y = test(asdf)",
    "function x = test()",
    "function [x, losses] = test(A, y, lambda, method, qtile)",
  ],
  specFailed: ["\tfunction testnot(asdf)", "function testnot()"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`^\s*classdef\s*KEYWORD\b\s*`,
  emacsRegexp: String.raw`^\s*classdef\s*JJJ\b\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["classdef test"],
  specFailed: ["classdef testnot"],
});
