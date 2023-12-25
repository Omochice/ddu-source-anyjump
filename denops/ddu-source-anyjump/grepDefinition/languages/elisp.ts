import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\((defun|cl-defun)\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\((defun|cl-defun)\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    `(defun test (blah)`,
    `(defun test\n`,
    `(cl-defun test (blah)`,
    `(cl-defun test\n`,
  ],
  specFailed: [
    `(defun test-asdf (blah)`,
    `(defun test-blah\n`,
    `(cl-defun test-asdf (blah)`,
    `(cl-defun test-blah\n`,
    `(defun tester (blah)`,
    `(defun test? (blah)`,
    `(defun test- (blah)`,
  ],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(defmacro\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defmacro\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [`(defmacro test (blah)`, `(defmacro test\n`],
  specFailed: [
    `(defmacro test-asdf (blah)`,
    `(defmacro test-blah\n`,
    `(defmacro tester (blah)`,
    `(defmacro test? (blah)`,
    `(defmacro test- (blah)`,
  ],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\(defvar\b\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defvar\b\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defvar test ", "(defvar test\n"],
  specFailed: ["(defvar tester", "(defvar test?", "(defvar test-"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\(defcustom\b\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defcustom\b\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defcustom test ", "(defcustom test\n"],
  specFailed: ["(defcustom tester", "(defcustom test?", "(defcustom test-"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\(setq\b\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(setq\b\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(setq test 123)"],
  specFailed: [
    "setq test-blah 123)",
    "(setq tester",
    "(setq test?",
    "(setq test-",
  ],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\(KEYWORD\s+`,
  emacsRegexp: String.raw`\(JJJ\s+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(let ((test 123)))"],
  specFailed: ["(let ((test-2 123)))"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`\((defun|cl-defun)\s*.+\(?\s*KEYWORD($|[^a-zA-Z0-9\?\*-])\s*\)?`,
  emacsRegexp: String.raw`\((defun|cl-defun)\s*.+\(?\s*JJJ\j\s*\)?`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "(defun blah (test)",
    "(defun blah (test blah)",
    "(defun (blah test)",
  ],
  specFailed: [
    "(defun blah (test-1)",
    "(defun blah (test-2 blah)",
    "(defun (blah test-3)",
  ],
});
