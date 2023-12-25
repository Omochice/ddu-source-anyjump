import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(define\s+\(\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(define\s+\(\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define (test blah)", "(define (test\n"],
  specFailed: [
    "(define test blah",
    "(define (test-asdf blah)",
    "(define test (lambda (blah",
  ],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(define\s+KEYWORD\s*\(\s*lambda`,
  emacsRegexp: String.raw`\(define\s+JJJ\s*\(\s*lambda`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define test (lambda (blah", "(define test (lambda\n"],
  specFailed: [
    "(define test blah",
    "(define test-asdf (lambda (blah)",
    "(define (test)",
    "(define (test blah) (lambda (foo",
  ],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(let\s+KEYWORD\s*(\(|\[)*`,
  emacsRegexp: String.raw`\(let\s+JJJ\s*(\(|\[)*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "(let test ((blah foo) (bar bas))",
    "(let test\n",
    "(let test [(foo",
  ],
  specFailed: ["(let ((test blah"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\(define\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(define\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define test ", "(define test\n"],
  specFailed: ["(define (test"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`(\(|\[)\s*KEYWORD\s+`,
  emacsRegexp: String.raw`(\(|\[)\s*JJJ\s+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "(let ((test 'foo",
    "(let [(test 'foo",
    "(let [(test 'foo",
    "(let [[test 'foo",
    "(let ((blah 'foo) (test 'bar)",
  ],
  specFailed: ["{test foo"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`\(lambda\s+\(?[^()]*\s*KEYWORD($|[^a-zA-Z0-9\?\*-])\s*\)?`,
  emacsRegexp: String.raw`\(lambda\s+\(?[^()]*\s*JJJ\j\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(lambda (test)", "(lambda (foo test)", "(lambda test (foo)"],
  specFailed: ["(lambda () test"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`\(define\s+\([^()]+\s*KEYWORD($|[^a-zA-Z0-9\?\*-])\s*\)?`,
  emacsRegexp: String.raw`\(define\s+\([^()]+\s*JJJ\j\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define (foo test)", "(define (foo test bar)"],
  specFailed: ["(define foo test", "(define (test foo", "(define (test)"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\(struct\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(struct\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(struct test (a b)"],
  specFailed: [],
});
