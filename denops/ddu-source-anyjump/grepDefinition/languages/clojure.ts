import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\(def\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(def\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(def test (foo)"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(defn-?\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defn-?\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defn test [foo]", "(defn- test [foo]"],
  specFailed: ["(defn test? [foo]", "(defn- test? [foo]"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(defmacro\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defmacro\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defmacro test [foo]"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\(deftask\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(deftask\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(deftask test [foo]"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\(deftype\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(deftype\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(deftype test [foo]"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\(defmulti\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defmulti\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defmulti test fn"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\(defmethod\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defmethod\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defmethod test type"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\(definterface\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(definterface\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(definterface test (foo)"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\(defprotocol\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defprotocol\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defprotocol test (foo)"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\(defrecord\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defrecord\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defrecord test [foo]"],
  specFailed: [],
});
