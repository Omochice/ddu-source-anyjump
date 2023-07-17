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

  const proc = new Deno.Command(COMMAND, {
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
