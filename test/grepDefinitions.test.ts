import { assertMatch, assertNotMatch } from "jsr:@std/assert@0.210.0";
import { definitions } from "../denops/ddu-source-anyjump/grepDefinitions.ts";
import { REGEX_KEYWORD } from "../denops/ddu-source-anyjump/ripgrep.ts";

for (const [lang, definition] of definitions) {
  Deno.test(`Test for ${lang}`, async (t) => {
    for (const def of definition) {
      const pattern = new RegExp(
        def.pcre2Regexp.replaceAll(REGEX_KEYWORD, "test"),
      );
      await t.step("should match", async (t) => {
        for (const spec of def.specSuccess) {
          await t.step(spec, () => {
            assertMatch(spec, pattern);
          });
        }
      });
      await t.step("should NOT match", async (t) => {
        for (const spec of def.specFailed) {
          await t.step(spec, () => {
            assertNotMatch(spec, pattern);
          });
        }
      });
    }
  });
}
