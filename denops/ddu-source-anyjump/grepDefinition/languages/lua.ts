import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test === 1234"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\bfunction\b[^\(]*\(\s*[^\)]*\bKEYWORD\b\s*,?\s*\)?`,
  emacsRegexp: String.raw`\bfunction\b[^\(]*\(\s*[^\)]*\bJJJ\b\s*,?\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function (test)",
    "function (test, blah)",
    "function somefunc(test, blah)",
    "function(blah, test)",
  ],
  specFailed: [
    "function (testLen)",
    "function (test1, blah)",
    "function somefunc(testFirst, blah)",
    "function(blah, testLast)",
    "function (Lentest)",
    "function (blahtest, blah)",
    "function somefunc(Firsttest, blah)",
    "function(blah, Lasttest)",
  ],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["function test()", "function test ()"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`function\s*.+[.:]KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*.+[.:]JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function MyClass.test()",
    "function MyClass.test ()",
    "function MyClass:test()",
    "function MyClass:test ()",
  ],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*=\s*function\s*\(`,
  emacsRegexp: String.raw`\bJJJ\s*=\s*function\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = function()"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\b.+\.KEYWORD\s*=\s*function\s*\(`,
  emacsRegexp: String.raw`\b.+\.JJJ\s*=\s*function\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["MyClass.test = function()"],
  specFailed: [],
});
