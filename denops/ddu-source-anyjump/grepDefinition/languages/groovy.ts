import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`^\s*((\w+[.])*\w+,\s*)*KEYWORD(,\s*(\w+[.])*\w+)*\s*=([^=>~]|$)`,
  emacsRegexp: String
    .raw`^\s*((\w+[.])*\w+,\s*)*JJJ(,\s*(\w+[.])*\w+)*\s*=([^=>~]|$)`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["test = 1234", "self.foo, test, bar = args"],
  specFailed: ["if test == 1234", "foo_test = 1234"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String
    .raw`(^|[^\w.])((private|public)\s+)?def\s+(\w+(::|[.]))*KEYWORD($|[^\w|:])`,
  emacsRegexp: String
    .raw`(^|[^\w.])((private|public)\s+)?def\s+(\w+(::|[.]))*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "def test(foo)",
    "def test()",
    "def test foo",
    "def test; end",
    "def self.test()",
    "def MODULE::test()",
    "private def test",
  ],
  specFailed: ["def test_foo"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`(^|[^\w.])class\s+(\w*::)*KEYWORD($|[^\w|:])`,
  emacsRegexp: String.raw`(^|[^\w.])class\s+(\w*::)*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["class test", "class Foo::test"],
  specFailed: [],
});
