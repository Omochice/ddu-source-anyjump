import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\s*(data)?type\s+.*\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*(data)?type\s+.*\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "datatype test =",
    "datatype test=",
    "datatype 'a test =",
    "type test =",
    "type 'a test =",
    "type 'a test",
    "type test",
  ],
  specFailed: ["datatypetest ="],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*val\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*val\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["val test =", "val test=", "val test : bool"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*fun\s+\bKEYWORD\b.*\s*=`,
  emacsRegexp: String.raw`\s*fun\s+\bJJJ\b.*\s*=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "fun test list =",
    "fun test (STRING_NIL, a) =",
    "fun test ((s1,s2): 'a queue) : 'a * 'a queue =",
    "fun test (var : q) : int =",
    "fun test f e xs =",
  ],
  specFailed: [],
});

definitions.push({
  type: "module",
  pcre2Regexp: String.raw`\s*(structure|signature|functor)\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*(structure|signature|functor)\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "structure test =",
    "structure test : MYTEST =",
    "signature test =",
    "functor test (T:TEST) =",
    "functor test(T:TEST) =",
  ],
  specFailed: [],
});
