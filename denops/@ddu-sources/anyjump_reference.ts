import {
  BaseSource,
  DduOptions,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v3.6.0/types.ts";
import { Denops, fn, vars } from "https://deno.land/x/ddu_vim@v3.6.0/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.5.3/file.ts";
import { search } from "../ddu-source-anyjump/references.ts";
import { convertMatch } from "../ddu-source-anyjump/convert.ts";
import { HighlightGroup } from "../ddu-source-anyjump/params.ts";

type Params = {
  highlights: HighlightGroup;
  removeCommentsFromResults: boolean;
  onlyCurrentFiletype: boolean;
};

export class Source extends BaseSource<Params> {
  kind = "file";

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

    return new ReadableStream({
      async start(controller) {
        const cword = await fn.expand(args.denops, "<cword>") as string;
        const cwd = await fn.getcwd(args.denops) as string;

        const matches = await search(
          await vars.lo.get(args.denops, "filetype"),
          cword,
          {
            cwd,
            checkInComment: args.sourceParams.removeCommentsFromResults,
            onlyCurrentFiletype: args.sourceParams.onlyCurrentFiletype,
          },
        );

        if (matches.length === 0) {
          controller.close();
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
