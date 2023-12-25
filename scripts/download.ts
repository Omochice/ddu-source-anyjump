import { okAsync, ResultAsync } from "npm:neverthrow@6.1.0";

export function main() {
  const URL =
    "https://raw.githubusercontent.com/jacktasia/dumb-jump/master/dumb-jump.el";
  const PARSE_PATTERNS = {
    head: "(defcustom dumb-jump-find-rules",
    tail: '"List of regex patttern templates',
  };

  return ResultAsync.fromPromise(fetch(URL), () => new Error())
    .andThen((res) => ResultAsync.fromPromise(res.text(), () => new Error()))
    .andThen((text) => {
      const head = text.indexOf(PARSE_PATTERNS.head);
      const tail = text.indexOf(PARSE_PATTERNS.tail);

      const res = text.substring(head + PARSE_PATTERNS.head.length, tail)
        .trim()
        .replaceAll(/^'\(\(/g, "((")
        .split(/\r?\n/)
        .map((line) => line.replaceAll(/^\s\s/g, ""))
        .filter((line) => !/^\s*;/.test(line))
        .join("\n");
      return okAsync(res);
    });
}

// console.log((await main()).value!);
