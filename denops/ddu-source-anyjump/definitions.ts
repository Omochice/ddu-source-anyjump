import { definitions } from "./grepDefinitions.ts";
import {
  baseArgs,
  COMMAND,
  getRgIgnoreSpecifier,
  isMatchInComment,
  type Match,
  REGEX_KEYWORD,
  validate,
} from "./ripgrep.ts";
import { convertLanguageName } from "./langMap.ts";
import { decode } from "./decode.ts";
import { errAsync, okAsync, ResultAsync } from "npm:neverthrow@6.2.2";

/**
 * Search definitions by ripgrep
 *
 * @param lang target language
 * @param keyword target word
 * @param option search option
 * @return list of matches
 */
export function search(
  lang: string,
  keyword: string,
  option: {
    isFish?: boolean;
    cwd: string;
    checkInComment: boolean;
  },
): ResultAsync<Match[], Error> {
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
    return errAsync(
      new Error(`Language '${lang}' is not supported for search definition`),
    );
  }

  const args = [
    ...baseArgs,
    "-t",
    convertLanguageName(lang),
    ...getRgIgnoreSpecifier(),
    `(${regex})`,
  ];
  const proc = new Deno.Command(COMMAND, {
    args,
    stdout: "piped",
    cwd: option.cwd,
  });

  return ResultAsync.fromPromise(
    proc.output(),
    (e) => new Error("Failed to execute ripgrep", { cause: e }),
  )
    .andThen((commandOutput) =>
      okAsync(
        decode(commandOutput.stdout)
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
          }),
      )
    );
}
