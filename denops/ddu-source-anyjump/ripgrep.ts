import {
  $array,
  $const,
  $number,
  $object,
  $string,
  type Infer,
} from "npm:lizod@0.2.7";
import { commentMap } from "./commentMap.ts";

/** Word for replace ripgrep command */
export const REGEX_KEYWORD = "KEYWORD";

/** ripgrep command name */
export const COMMAND = "rg";

/** ripgrep base args */
export const baseArgs = ["-n", "--auto-hybrid-regex", "--json"] as const;

type Option = {
  disableVcsIgnore?: boolean;
  ignoredFiles?: string[];
};

const defaultOption: Required<Option> = {
  disableVcsIgnore: false,
  ignoredFiles: ["*.tmp", "*.temp"],
};

/**
 * Genrage ripgrep ignore arguments
 *
 * @param option
 * @return ripgrep arguments
 */
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

/**
 * Validate is input ripgrep match object
 *
 * @param input validation target
 * @return Wheather is input matched
 */
export const validate = $object({
  type: $const("match"),
  data: $object({
    path: $object({ text: $string }),
    lines: $object({ text: $string }),
    line_number: $number,
    absolute_offset: $number,
    submatches: $array(
      $object({
        match: $object({ text: $string }),
        start: $number,
        end: $number,
      }),
    ),
  }),
});

export type Match = Infer<typeof validate>;

/**
 * Test match point is included by comment
 *
 * @param match ripgrep match object
 * @param lang language name
 * @return whether is match point included by comment
 * @example
 * ```ts
 * ```
 */
export function isMatchInComment(match: Match, lang: string): boolean {
  // if comment map does not support the lang, cannot filter
  if (!commentMap.has(lang)) {
    return false;
  }

  const target = match.data.submatches.length === 0
    ? match.data.lines.text
    : match.data.lines.text.substring(
      0,
      match.data.submatches[0].start,
    );

  return commentMap.get(lang)!.some((comment) => {
    const re = new RegExp(comment);
    return re.test(target);
  });
}
