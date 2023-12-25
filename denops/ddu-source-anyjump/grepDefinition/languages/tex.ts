import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "command",
  pcre2Regexp: String.raw`\\\\.*newcommand\*?\s*\{\s*(\\\\)KEYWORD\s*}`,
  emacsRegexp: String.raw`\\\\.*newcommand\*?\s*\{\s*(\\\\)JJJ\s*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    String.raw`\\newcommand{\\test}`,
    String.raw`\\renewcommand{\\test}`,
    String.raw`\\renewcommand*{\\test}`,
    String.raw`\\newcommand*{\\test}`,
    String.raw`\\renewcommand{ \\test }`,
  ],
  specFailed: [String.raw`\\test`, "test"],
});

definitions.push({
  type: "command",
  pcre2Regexp: String
    .raw`\\\\.*newcommand\*?\s*(\\\\)KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\\\\.*newcommand\*?\s*(\\\\)JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    String.raw`\\newcommand\\test {}`,
    String.raw`\\renewcommand\\test{}`,
    String.raw`\\newcommand \\test`,
  ],
  specFailed: [String.raw`\\test`, "test"],
});

definitions.push({
  type: "length",
  pcre2Regexp: String.raw`\\\\(s)etlength\s*\{\s*(\\\\)KEYWORD\s*}`,
  emacsRegexp: String.raw`\\\\(s)etlength\s*\{\s*(\\\\)JJJ\s*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    String.raw`\\setlength { \\test}`,
    String.raw`\\setlength{\\test}`,
    String.raw`\\setlength{\\test}{morecommands}`,
  ],
  specFailed: [String.raw`\\test`, "test"],
});

definitions.push({
  type: "counter",
  pcre2Regexp: String.raw`\\\\newcounter\{\s*KEYWORD\s*}`,
  emacsRegexp: String.raw`\\\\newcounter\{\s*JJJ\s*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [String.raw`\\newcounter{test}`],
  specFailed: [String.raw`\\test`, "test"],
});

definitions.push({
  type: "environment",
  pcre2Regexp: String.raw`\\\\.*newenvironment\s*\{\s*KEYWORD\s*}`,
  emacsRegexp: String.raw`\\\\.*newenvironment\s*\{\s*JJJ\s*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    String.raw`\\newenvironment{test}`,
    String.raw`\\newenvironment {test}{morecommands}`,
    String.raw`\\lstnewenvironment{test}`,
    String.raw`\\newenvironment {test}`,
  ],
  specFailed: [String.raw`\\test`, "test"],
});
