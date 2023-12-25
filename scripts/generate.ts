import { errAsync, okAsync, ResultAsync } from "npm:neverthrow@6.1.0";
import tsj from "https://esm.sh/@gholk/tsjson@3.3.0";
import { ensure, is } from "https://deno.land/x/unknownutil@v3.11.0/mod.ts";

function download() {
  const url = new URL(
    "https://raw.githubusercontent.com/jacktasia/dumb-jump/master/dumb-jump.el",
  );
  const PARSE_PATTERNS = {
    head: "(defcustom dumb-jump-find-rules",
    tail: '"List of regex patttern templates',
  };

  return ResultAsync.fromPromise(
    fetch(url),
    (e) => new Error("Fetch Error", { cause: e }),
  )
    .andThen((res) =>
      ResultAsync.fromPromise(
        res.text(),
        (e) => new Error("Failed to read body as text", { cause: e }),
      )
    )
    .andThen((text) => {
      const head = text.indexOf(PARSE_PATTERNS.head);
      const tail = text.indexOf(PARSE_PATTERNS.tail);

      const res = text.substring(head + PARSE_PATTERNS.head.length, tail)
        .trim()
        .replaceAll(/(^'\()|(\)$)/g, "")
        .split(/\r?\n/)
        .map((line) => line.replaceAll(/^\s\s/g, ""))
        .filter((line) => !/^\s*;/.test(line))
        .join("\n");
      return okAsync(res);
    });
}

const isDefinition = is.ObjectOf({
  type: is.String,
  regex: is.String,
  language: is.String,
  supports: is.ArrayOf(is.String),
  tests: is.ArrayOf(is.String),
  not: is.OptionalOf(is.ArrayOf(is.String)),
});

await download()
  .andThen((s) => {
    try {
      // @ts-ignore tsjson has not type definition...
      return okAsync(ensure(tsj.j(s), is.ArrayOf(isDefinition)));
    } catch (e) {
      return errAsync(new Error("object has invelid shape", { cause: e }));
    }
  })
  .match(
    (s) => {
      console.log(Object.groupBy(s, (o) => o.language));
    },
    (e: unknown) => {
      console.error(e);
    },
  );
