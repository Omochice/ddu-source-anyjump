import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*Variable\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Variable\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Variable test"],
  specFailed: ["Variable testx"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*Inductive\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Inductive\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Inductive test"],
  specFailed: ["Inductive testx"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*Lemma\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Lemma\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Lemma test"],
  specFailed: ["Lemma testx"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*Definition\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Definition\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Definition test"],
  specFailed: ["Definition testx"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*Hypothesis\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Hypothesis\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Hypothesis test"],
  specFailed: ["Hypothesis testx"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*Theorm\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Theorm\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Theorm test"],
  specFailed: ["Theorm testx"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*Fixpoint\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Fixpoint\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Fixpoint test"],
  specFailed: ["Fixpoint testx"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*Module\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Module\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Module test"],
  specFailed: ["Module testx"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\s*CoInductive\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*CoInductive\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["CoInductive test"],
  specFailed: ["CoInductive testx"],
});
