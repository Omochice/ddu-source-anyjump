import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test == 1234 {"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*:=\s*`,
  emacsRegexp: String.raw`\s*\bJJJ\s*:=\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test := 1234"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`func\s+\([^\)]*\)\s+KEYWORD\s*\(`,
  emacsRegexp: String.raw`func\s+\([^\)]*\)\s+JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["func (s *blah) test(filename string) string {"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`func\s+KEYWORD\s*\(`,
  emacsRegexp: String.raw`func\s+JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["func test(url string) (string, error)"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`type\s+KEYWORD\s+struct\s+\{`,
  emacsRegexp: String.raw`type\s+JJJ\s+struct\s+\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["type test struct {"],
  specFailed: [],
});
