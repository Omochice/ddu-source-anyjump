import {
  BaseSource,
  DduOptions,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v3.10.3/types.ts";
import { Denops, fn, vars } from "https://deno.land/x/ddu_vim@v3.10.3/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.7.1/file.ts";
import { echoerr } from "https://deno.land/x/denops_std@v6.4.0/helper/mod.ts";
import { ensure, is } from "https://deno.land/x/unknownutil@v3.18.0/mod.ts";
import { search } from "../ddu-source-anyjump/definitions.ts";
import { convertMatch } from "../ddu-source-anyjump/convert.ts";
import { HighlightGroup } from "../ddu-source-anyjump/params.ts";

type Params = {
  highlights: HighlightGroup;
  removeCommentsFromResults: boolean;
};

export class Source extends BaseSource<Params> {
  kind = "file";
  #cword = "";
  #cwd = "";
  #filetype = "";

  async onInit(args: { denops: Denops }): Promise<void> {
    this.#cword = ensure(await fn.expand(args.denops, "<cword>"), is.String);
    this.#cwd = await fn.getcwd(args.denops);
    this.#filetype = await vars.lo.get(args.denops, "filetype");
  }

  gather(args: {
    denops: Denops;
    options: DduOptions;
    sourceOptions: SourceOptions;
    sourceParams: Params;
    input: string;
  }): ReadableStream<Item<ActionData>[]> {
    const hlGroupPath = args.sourceParams.highlights?.path ?? "";
    const hlGroupLineNr = args.sourceParams.highlights?.lineNr ?? "";
    const hlGroupWord = args.sourceParams.highlights?.word ?? "";

    const cword = this.#cword;
    const cwd = this.#cwd;
    const filetype = this.#filetype;

    return new ReadableStream({
      async start(controller) {
        await search(
          filetype,
          cword,
          {
            isFish: /fish/.test(Deno.env.get("SHELL") ?? ""),
            cwd,
            checkInComment: args.sourceParams.removeCommentsFromResults,
          },
        ).match(
          async (matches) => {
            if (matches.length === 0) {
              return;
            }
            controller.enqueue(matches.map((m) =>
              convertMatch(m, {
                cwd,
                hlGroupPath,
                hlGroupWord,
                hlGroupLineNr,
              })
            ));
            await Promise.resolve(undefined);
          },
          async (err: Error) => {
            await echoerr(args.denops, err.message);
          },
        );
        controller.close();
      },
    });
  }

  params(): Params {
    return {
      highlights: {
        path: "Normal",
        lineNr: "Normal",
        word: "Search",
      },
      removeCommentsFromResults: true,
    };
  }
}
