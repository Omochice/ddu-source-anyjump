import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String
    .raw`(@noinline|@inline)?\s*function\s*KEYWORD(\{[^\}]*\})?\(`,
  emacsRegexp: String.raw`(@noinline|@inline)?\s*function\s*JJJ(\{[^\}]*\})?\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function test()",
    "@inline function test()",
    "function test{T}(h)",
  ],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String
    .raw`(@noinline|@inline)?KEYWORD(\{[^\}]*\})?\([^\)]*\)s*=`,
  emacsRegexp: String.raw`(@noinline|@inline)?JJJ(\{[^\}]*\})?\([^\)]*\)s*=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "test(a)=1",
    "test(a,b)=1*8",
    "@noinline test()=1",
    "test{T}(x)=x",
  ],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`macro\s*KEYWORD\(`,
  emacsRegexp: String.raw`macro\s*JJJ\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["macro test(a)=1", " macro test(a,b)=1*8"],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`const\s+KEYWORD\b`,
  emacsRegexp: String.raw`const\s+JJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["const test = "],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`(mutable)?\s*struct\s*KEYWORD`,
  emacsRegexp: String.raw`(mutable)?\s*struct\s*JJJ`,
  supports: ["ag", "rg"],
  specSuccess: ["struct test"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`(type|immutable|abstract)\s*KEYWORD`,
  emacsRegexp: String.raw`(type|immutable|abstract)\s*JJJ`,
  supports: ["ag", "rg"],
  specSuccess: ["type test", "immutable test", "abstract test <:Testable"],
  specFailed: [],
});
