import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`fun\s*(<[^>]*>)?\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`fun\s*(<[^>]*>)?\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["fun test()", "fun <T> test()"],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`(val|var)\s*KEYWORD\b`,
  emacsRegexp: String.raw`(val|var)\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["val test ", "var test"],
  specFailed: ["val testval", "var testvar"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`(class|interface)\s*KEYWORD\b`,
  emacsRegexp: String.raw`(class|interface)\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test", "class test : SomeInterface", "interface test"],
  specFailed: [],
});
