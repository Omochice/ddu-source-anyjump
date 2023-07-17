import {
  baseArgs,
  command,
  convertLanguageName,
  getRgIgnoreSpecifier,
} from "./base.ts";
import { decode } from "./decode.ts";
import { isMatchInComment, type Match, validate } from "./ripgrepMatch.ts";

export async function search(
  lang: string,
  keyword: string,
  option: {
    onlyCurrentFiletype: boolean;
    cwd: string;
    checkInComment: boolean;
  },
): Promise<Match[]> {
  const kw = keyword.replaceAll("\\-", "\\\\\\\\-"); // shell escape
  const args = [
    ...baseArgs,
    "-w",
    kw,
    getRgIgnoreSpecifier(),
    option.onlyCurrentFiletype ? ["-t", convertLanguageName(lang)] : [],
  ].flat(2);

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
