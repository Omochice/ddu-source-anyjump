import { Item } from "https://deno.land/x/ddu_vim@v4.1.0/types.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.7.1/file.ts";
import { resolve } from "jsr:@std/path@0.225.2";
import { type Match } from "./ripgrep.ts";

/**
 * Get length of UTF8 string
 *
 * @param str target string
 * @return length of string
 */
const utf8Length = (() => {
  const encoder = new TextEncoder();
  return (str: string): number => encoder.encode(str).length;
})();

/**
 * Convert ripgrep match to DDU's item
 *
 * @param match match element by ripgrep
 * @param option convert option
 * @return converted one
 */
export function convertMatch(match: Match, option: {
  cwd: string;
  hlGroupPath: string;
  hlGroupLineNr: string;
  hlGroupWord: string;
}): Item<ActionData> {
  const path = match.data.path.text;
  const lineNr = match.data.line_number;
  const col = match.data.submatches[0].start;
  const header = `${path}:${lineNr}:${col}`;
  const text = match.data.lines.text?.replace(/\r?\n/, "");
  return {
    word: `${header} ${text}`,
    action: {
      path: resolve(option.cwd, match.data.path.text),
      lineNr,
      col: col + 1,
      text,
    },
    highlights: [
      {
        name: "path",
        hl_group: option.hlGroupPath,
        col: 1,
        width: utf8Length(path),
      },
      {
        name: "lineNr",
        hl_group: option.hlGroupLineNr,
        col: utf8Length(path) + 2,
        width: utf8Length(lineNr.toString()),
      },
      {
        name: "word",
        hl_group: option.hlGroupWord,
        col: utf8Length(header) + col + 1,
        width: match.data.submatches[0].end - col,
      },
    ],
  };
}
