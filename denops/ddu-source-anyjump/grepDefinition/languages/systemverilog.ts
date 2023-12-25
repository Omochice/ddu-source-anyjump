import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\s*class\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*class\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "virtual class test;",
    "class test;",
    "class test extends some_class",
  ],
  specFailed: [
    "virtual class testing;",
    "class test2;",
    "class some_test",
    "class some_class extends test",
  ],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\s*task\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*task\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["task test (", "task test("],
  specFailed: ["task testing (", "task test2("],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\s*\bKEYWORD\b\s*=`,
  emacsRegexp: String.raw`\s*\bJJJ\b\s*=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["assign test =", "assign test=", "int test =", "int test="],
  specFailed: ["assign testing =", "assign test2="],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`function\s[^\s]+\s*\bKEYWORD\b`,
  emacsRegexp: String.raw`function\s[^\s]+\s*\bJJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["function Matrix test ;", "function Matrix test;"],
  specFailed: ["function test blah"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`^\s*[^\s]*\s*[^\s]+\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`^\s*[^\s]*\s*[^\s]+\s+\bJJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "some_class_name test",
    "  another_class_name  test ;",
    "some_class test[];",
    "some_class #(1) test",
  ],
  specFailed: ["test some_class_name", "class some_class extends test"],
});
