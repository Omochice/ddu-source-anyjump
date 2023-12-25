import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if (test == 1234)"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String
    .raw`\b(function|subroutine|FUNCTION|SUBROUTINE)\s+KEYWORD\b\s*\(`,
  emacsRegexp: String
    .raw`\b(function|subroutine|FUNCTION|SUBROUTINE)\s+JJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function test (foo)",
    "integer function test(foo)",
    "subroutine test (foo, bar)",
    "FUNCTION test (foo)",
    "INTEGER FUNCTION test(foo)",
    "SUBROUTINE test (foo, bar)",
  ],
  specFailed: [
    "end function test",
    "end subroutine test",
    "END FUNCTION test",
    "END SUBROUTINE test",
  ],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`^\s*(interface|INTERFACE)\s+KEYWORD\b`,
  emacsRegexp: String.raw`^\s*(interface|INTERFACE)\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["interface test", "INTERFACE test"],
  specFailed: [
    "interface test2",
    "end interface test",
    "INTERFACE test2",
    "END INTERFACE test",
  ],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`^\s*(module|MODULE)\s+KEYWORD\s*`,
  emacsRegexp: String.raw`^\s*(module|MODULE)\s+JJJ\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["module test", "MODULE test"],
  specFailed: ["end module test", "END MODULE test"],
});
