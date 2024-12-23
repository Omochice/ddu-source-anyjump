import type { Item } from "jsr:@shougo/ddu-vim@9.2.0/types";
import type { ActionData } from "jsr:@shougo/ddu-kind-file@0.9.0";
import { resolve } from "jsr:@std/path@1.0.8";
import type { Match } from "./ripgrep.ts";

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
