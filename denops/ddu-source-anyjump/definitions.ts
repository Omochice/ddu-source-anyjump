import { definitions } from "./langMap.ts";
import {
  baseArgs,
  command,
  convertLanguageName,
  getRgIgnoreSpecifier,
  REGEX_KEYWORD,
} from "./base.ts";
import { decode } from "./decode.ts";
import { isMatchInComment, type Match, validate } from "./ripgrepMatch.ts";

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
    checkInComment: boolean;
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
      return validate(e) &&
        !(option.checkInComment && isMatchInComment(e, lang));
    });
}
