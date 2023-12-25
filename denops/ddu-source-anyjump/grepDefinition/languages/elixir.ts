import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bdef(p)?\s+KEYWORD\s*[ ,\(]`,
  emacsRegexp: String.raw`\bdef(p)?\s+JJJ\s*[ ,\(]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "def test do",
    "def test, do:",
    "def test() do",
    "def test(), do:",
    "def test(foo, bar) do",
    "def test(foo, bar), do:",
    "defp test do",
    "defp test(), do:",
  ],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\s*KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test == 1234"],
});

definitions.push({
  type: "module",
  pcre2Regexp: String.raw`defmodule\s+(\w+\.)*KEYWORD\s+`,
  emacsRegexp: String.raw`defmodule\s+(\w+\.)*JJJ\s+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["defmodule test do", "defmodule Foo.Bar.test do"],
  specFailed: [],
});

definitions.push({
  type: "module",
  pcre2Regexp: String.raw`defprotocol\s+(\w+\.)*KEYWORD\s+`,
  emacsRegexp: String.raw`defprotocol\s+(\w+\.)*JJJ\s+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["defprotocol test do", "defprotocol Foo.Bar.test do"],
  specFailed: [],
});
