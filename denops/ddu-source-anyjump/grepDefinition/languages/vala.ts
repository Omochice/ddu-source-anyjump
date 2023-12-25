import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}KEYWORD\s*\(`,
  emacsRegexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}JJJ\s*\(`,
  supports: ["ag", "rg"],
  specSuccess: [
    "int test()",
    "int test(param)",
    "static int test()",
    "static int test(param)",
    "public static MyType test()",
    "private virtual SomeType test(param)",
    "static int test()",
  ],
  specFailed: ["test()", "testnot()", "blah = new test()"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n)]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n)]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["int test = 1234"],
  specFailed: ["if test == 1234:", "int nottest = 44"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`(class|interface)\s*KEYWORD\b`,
  emacsRegexp: String.raw`(class|interface)\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test:", "public class test : IReadableChannel, I"],
  specFailed: [
    "class testnot:",
    "public class testnot : IReadableChannel, I",
  ],
});
