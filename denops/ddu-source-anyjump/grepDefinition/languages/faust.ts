import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD(\(.+\))*\s*=`,
  emacsRegexp: String.raw`\bJJJ(\(.+\))*\s*=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = osc + 0.5;", "test(freq) = osc(freq) + 0.5;"],
  specFailed: [],
});
