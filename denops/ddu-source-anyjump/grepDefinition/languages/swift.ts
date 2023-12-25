import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`(let|var)\s*KEYWORD\s*(=|:)[^=:\n]+`,
  emacsRegexp: String.raw`(let|var)\s*JJJ\s*(=|:)[^=:\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "let test = 1234",
    "var test = 1234",
    "private lazy var test: UITapGestureRecognizer",
  ],
  specFailed: ["if test == 1234:"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`func\s+KEYWORD\b\s*(<[^>]*>)?\s*\(`,
  emacsRegexp: String.raw`func\s+JJJ\b\s*(<[^>]*>)?\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "func test(asdf)",
    "func test()",
    "func test<Value: Protocol>()",
  ],
  specFailed: ["func testnot(asdf)", "func testnot()"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`(class|struct|protocol|enum)\s+KEYWORD\b\s*?`,
  emacsRegexp: String.raw`(class|struct|protocol|enum)\s+JJJ\b\s*?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "struct test",
    "struct test: Codable",
    "struct test<Value: Codable>",
    "class test:",
    "class test: UIWindow",
    "class test<Value: Codable>",
  ],
  specFailed: [
    "class testnot:",
    "class testnot(object):",
    "struct testnot(object)",
  ],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`(typealias)\s+KEYWORD\b\s*?=`,
  emacsRegexp: String.raw`(typealias)\s+JJJ\b\s*?=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["typealias test ="],
  specFailed: ["typealias testnot"],
});
