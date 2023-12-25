import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(defun\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defun\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defun test (blah)", "(defun test\n"],
  specFailed: [
    "(defun test-asdf (blah)",
    "(defun test-blah\n",
    "(defun tester (blah)",
    "(defun test? (blah)",
    "(defun test- (blah)",
  ],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\(defparameter\b\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defparameter\b\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defparameter test ", "(defparameter test\n"],
  specFailed: [
    "(defparameter tester",
    "(defparameter test?",
    "(defparameter test-",
  ],
});
