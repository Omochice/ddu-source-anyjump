import { main } from "./download.ts";
import tsj from "https://esm.sh/@gholk/tsjson"; // or 'path/to/tsjson/index.esm.js'
// const s = Deno.readTextFileSync("./downloaded.el");

await main().match(
  (s: string) => {
    console.log(tsj.j(s).length);
  },
  (e: unknown) => {
    console.error(e);
  },
);
// console.log(tsj.j(s));
