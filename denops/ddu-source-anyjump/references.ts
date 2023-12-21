import {
  baseArgs,
  COMMAND,
  getRgIgnoreSpecifier,
  isMatchInComment,
  type Match,
  validate,
} from "./ripgrep.ts";
import { convertLanguageName } from "./langMap.ts";
import { decode } from "./decode.ts";
import { okAsync, ResultAsync } from "npm:neverthrow@6.1.0";

export function search(
  lang: string,
  keyword: string,
  option: {
    onlyCurrentFiletype: boolean;
    cwd: string;
    checkInComment: boolean;
  },
): ResultAsync<Match[], Error> {
  const kw = keyword.replaceAll("\\-", "\\\\\\\\-"); // shell escape
  const args = [
    ...baseArgs,
    "-w",
    kw,
    getRgIgnoreSpecifier(),
    option.onlyCurrentFiletype ? ["-t", convertLanguageName(lang)] : [],
  ].flat(2);

  const proc = new Deno.Command(COMMAND, {
    args,
    stdout: "piped",
    cwd: option.cwd,
  });

  return ResultAsync.fromPromise(proc.output(), () => new Error())
    .andThen((commandOutput) => {
      return okAsync(
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
      );
    });
}
