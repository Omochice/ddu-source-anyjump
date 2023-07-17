import { definitions } from "./langMap.ts";
import { baseArgs, convertLanguageName, getRgIgnoreSpecifier } from "./base.ts";
import {
  $array,
  $const,
  $number,
  $object,
  $string,
  type Infer,
} from "https://esm.sh/lizod@0.2.6";

/** Word for replace ripgrep command */
const REGEX_KEYWORD = "KEYWORD";

/** ripgrep command name */
const command = "rg";

/**
 * Decode Uint8Array as string
 *
 * @param raw target string
 * @return decoded one
 */
const decode = (() => {
  const decoder = new TextDecoder();
  return (raw: Uint8Array): string => decoder.decode(raw);
})();

/**
 * Validate is input ripgrep match object
 *
 * @param input validation target
 * @return Wheather is input matched
 */
const validate = $object({
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
 * Search definitions by ripgrep
 *
 * @param lang target language
 * @param keyword target word
 * @param option search option
 * @return list of matches
 */
export async function search(
  lang: string,
  keyword: string,
  option: {
    isFish?: boolean;
    cwd: string;
  },
): Promise<Match[]> {
  const regex = definitions.get(lang)
    ?.map((rule) => {
      const replaced = rule.pcre2Regexp.replaceAll(REGEX_KEYWORD, keyword);
      if (option.isFish) {
        return replaced.replaceAll("\\$", "\\\\$");
      }
      return replaced;
    })
    .map((pattern) => `(${pattern})`)
    .join("|");

  if (regex === undefined) {
    throw new Error("undefined");
  }

  const args = [
    ...baseArgs,
    "-t",
    convertLanguageName(lang),
    ...getRgIgnoreSpecifier(),
    `(${regex})`,
  ];
  const proc = new Deno.Command(command, {
    args,
    stdout: "piped",
    cwd: option.cwd,
  });
  return decode((await proc.output()).stdout)
    .split("\n")
    .map((line: string) => {
      try {
        return JSON.parse(line);
      } catch {
        return {};
      }
    })
    .filter((e) => {
      return validate(e);
    });
}
