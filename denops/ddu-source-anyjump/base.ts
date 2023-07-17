import { Denops, fn } from "https://deno.land/x/ddu_vim@v3.4.2/deps.ts";

/** Word for replace ripgrep command */
export const REGEX_KEYWORD = "KEYWORD";

/** ripgrep command name */
export const command = "rg";

export const baseArgs = ["-n", "--auto-hybrid-regex", "--json"] as const;

const filetypesPropxy = new Map([
  ["javascriptreact", "javascript"],
  ["c", "cpp"],
]);

const langMap = new Map([
  ["python", "py"],
  ["javascript", "js"],
  ["typescript", "ts"],
  ["commonlisp", "lisp"],
  ["scss", "css"],
]);

export function convertLanguageName(langage: string): string {
  return langMap.get(langage) ?? langage;
}

const commentStringMap = new Map([
  ["cpp", ["//"]],
  ["elisp", [";"]],
  ["commonlisp", [";"]],
  ["javascript", ["//"]],
  ["typescript", ["//"]],
  ["dart", ["//"]],
  ["haskell", ["--"]],
  ["lua", ["--"]],
  ["rust", ["//"]],
  ["julia", ["#"]],
  ["objc", ["//"]],
  ["csharp", ["//"]],
  ["java", ["//"]],
  ["clojure", [";"]],
  ["coffeescript", ["#"]],
  ["faust", ["//"]],
  ["fortran", ["!"]],
  ["go", ["//"]],
  ["perl", ["#"]],
  ["php", ["//", "#"]],
  ["python", ["#"]],
  ["matlab", ["%"]],
  ["r", ["#"]],
  ["racket", [";"]],
  ["ruby", ["#"]],
  ["crystal", ["#"]],
  ["nim", ["#"]],
  ["nix", ["#"]],
  ["scala", ["//"]],
  ["scheme", [";"]],
  ["shell", ["#"]],
  ["swift", ["//"]],
  ["elixir", ["#"]],
  ["erlang", ["%"]],
  ["tex", ["%"]],
  ["systemverilog", ["//"]],
  ["vhdl", ["--"]],
  ["scss", ["//"]],
  ["pascal", ["//"]],
  ["protobuf", ["//"]],
  ["zig", ["//"]],
]);

type Option = {
  disableVcsIgnore?: boolean;
  ignoredFiles?: string[];
};

const defaultOption: Required<Option> = {
  disableVcsIgnore: false,
  ignoredFiles: ["*.tmp", "*.temp"],
};

export function getRgIgnoreSpecifier(option?: Option) {
  const mergedOption = { ...option, ...defaultOption };
  const result = [];
  if (mergedOption.disableVcsIgnore) {
    result.push("--no-ignore-vcs");
  }
  for (const glob of mergedOption.ignoredFiles ?? ["*.tmp", "*.temp"]) {
    result.push("-g");
    result.push(`!'${glob}'`);
  }
  return result;
}
