import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`fn\s+KEYWORD\b`,
  emacsRegexp: String.raw`fn\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "fn test() void {",
    "fn test(a: i32) i32 {",
    "pub fn test(a: i32) i32 {",
    "export fn test(a: i32) i32 {",
    'extern "c" fn test(a: i32) i32 {',
    "inline fn test(a: i32) i32 {",
  ],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`(var|const)\s+KEYWORD\b`,
  emacsRegexp: String.raw`(var|const)\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "const test: i32 = 3;",
    "var test: i32 = 3;",
    "pub const test: i32 = 3;",
  ],
  specFailed: [],
});
