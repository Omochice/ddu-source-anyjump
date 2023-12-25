import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`^\s*KEYWORD\s*[=:].*[-=]>`,
  emacsRegexp: String.raw`^\s*JJJ\s*[=:].*[-=]>`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "test = ()  =>",
    "test= =>",
    "test = ->",
    "test=()->",
    "test : ()  =>",
    "test: =>",
    "test : ->",
    "test:()->",
  ],
  specFailed: ["# test = =>", "test = 1"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`^\s*KEYWORD\s*[:=][^:=-][^>]+$`,
  emacsRegexp: String.raw`^\s*JJJ\s*[:=][^:=-][^>]+$`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = $", "test : [", "test = {", "test = a"],
  specFailed: ["test::a", "test: =>", "test == 1", "# test = 1"],
});

definitions.push({
  type: "class",
  pcre2Regexp: String.raw`^\s*\bclass\s+KEYWORD`,
  emacsRegexp: String.raw`^\s*\bclass\s+JJJ`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test", "class test extends"],
  specFailed: ["# class"],
});
