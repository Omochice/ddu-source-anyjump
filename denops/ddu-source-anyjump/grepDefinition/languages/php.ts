import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

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
  pcre2Regexp: String.raw`\*\s@method\s+[^ 	]+\s+KEYWORD\(`,
  emacsRegexp: String.raw`\*\s@method\s+[^ 	]+\s+JJJ\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "/** @method string|false test($a)",
    " * @method bool test()",
  ],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`(\s|->|\$|::)KEYWORD\s*=\s*`,
  emacsRegexp: String.raw`(\s|->|\$|::)JJJ\s*=\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["$test = 1234", "$foo->test = 1234"],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`\*\s@property(-read|-write)?\s+([^ 	]+\s+)&?\$KEYWORD(\s+|$)`,
  emacsRegexp: String
    .raw`\*\s@property(-read|-write)?\s+([^ 	]+\s+)&?\$JJJ(\s+|$)`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "/** @property string $test",
    "/** @property string $test description for $test property",
    " * @property-read bool|bool $test",
    " * @property-write \\ArrayObject<string,resource[]> $test",
  ],
  specFailed: [],
});

definitions.push({
  type: "trait",
  pcre2Regexp: String.raw`trait\s*KEYWORD\s*\{`,
  emacsRegexp: String.raw`trait\s*JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["trait test{", "trait test {"],
  specFailed: [],
});

definitions.push({
  type: "interface",
  pcre2Regexp: String.raw`interface\s*KEYWORD\s*\{`,
  emacsRegexp: String.raw`interface\s*JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["interface test{", "interface test {"],
  specFailed: [],
});

definitions.push({
  type: "class",
  pcre2Regexp: String.raw`class\s*KEYWORD\s*(extends|implements|\{)`,
  emacsRegexp: String.raw`class\s*JJJ\s*(extends|implements|\{)`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "class test{",
    "class test {",
    "class test extends foo",
    "class test implements foo",
  ],
  specFailed: [],
});
