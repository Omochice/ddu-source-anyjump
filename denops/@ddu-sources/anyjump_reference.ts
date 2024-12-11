import type {
  DduOptions,
  Item,
  SourceOptions,
} from "jsr:@shougo/ddu-vim@9.1.0/types";
import { BaseSource } from "jsr:@shougo/ddu-vim@9.1.0/source";
import type { Denops } from "jsr:@denops/std@7.4.0";
import { expand, getcwd } from "jsr:@denops/std@7.4.0/function";
import { localOptions } from "jsr:@denops/std@7.4.0/variable";
import type { ActionData } from "jsr:@shougo/ddu-kind-file@0.9.0";
import { echoerr } from "jsr:@denops/std@7.4.0/helper";
import { ensure, is } from "jsr:@core/unknownutil@4.3.0";
import { search } from "../ddu-source-anyjump/references.ts";
import { convertMatch } from "../ddu-source-anyjump/convert.ts";
import type { HighlightGroup } from "../ddu-source-anyjump/params.ts";

type Params = {
  highlights: HighlightGroup;
  removeCommentsFromResults: boolean;
  onlyCurrentFiletype: boolean;
};

export class Source extends BaseSource<Params> {
  kind = "file";
  #cword = "";
  #cwd = "";
  #filetype = "";

  async onInit(args: { denops: Denops }): Promise<void> {
    this.#cword = ensure(await expand(args.denops, "<cword>"), is.String);
    this.#cwd = await getcwd(args.denops);
    this.#filetype = ensure(
      await localOptions.get(args.denops, "filetype"),
      is.String,
    );
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
            cwd,
            checkInComment: args.sourceParams.removeCommentsFromResults,
            onlyCurrentFiletype: args.sourceParams.onlyCurrentFiletype,
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
      onlyCurrentFiletype: false,
    };
  }
}
