import { describe, it } from "jsr:@std/testing@1.0.1/bdd";
import { expect } from "jsr:@std/expect@1.0.2";
import { definitions } from "./grepDefinitions.ts";
import { REGEX_KEYWORD } from "./ripgrep.ts";

for (const [lang, definition] of definitions) {
  describe(`Test for ${lang}`, () => {
    for (const def of definition) {
      const pattern = new RegExp(
        def.pcre2Regexp.replaceAll(REGEX_KEYWORD, "test"),
      );
      it("should match", () => {
        for (const spec of def.specSuccess) {
          expect(spec).toMatch(pattern);
        }
      });
      it("should NOT match", () => {
        for (const spec of def.specFailed) {
          expect(spec).not.toMatch(pattern);
        }
      });
    }
  });
}
