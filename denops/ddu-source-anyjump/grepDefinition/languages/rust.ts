import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`\blet\s+(\([^=\n]*)?(mut\s+)?KEYWORD([^=\n]*\))?(:\s*[^=\n]+)?\s*=\s*[^=\n]+`,
  emacsRegexp: String
    .raw`\blet\s+(\([^=\n]*)?(muts+)?JJJ([^=\n]*\))?(:\s*[^=\n]+)?\s*=\s*[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "let test = 1234;",
    "let test: u32 = 1234;",
    "let test: Vec<u32> = Vec::new();",
    "let mut test = 1234;",
    "let mut test: Vec<u32> = Vec::new();",
    "let (a, test, b) = (1, 2, 3);",
    "let (a, mut test, mut b) = (1, 2, 3);",
    "let (mut a, mut test): (u32, usize) = (1, 2);",
  ],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\bconst\s+KEYWORD:\s*[^=\n]+\s*=[^=\n]+`,
  emacsRegexp: String.raw`\bconst\s+JJJ:\s*[^=\n]+\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["const test: u32 = 1234;"],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\bstatic\s+(mut\s+)?KEYWORD:\s*[^=\n]+\s*=[^=\n]+`,
  emacsRegexp: String.raw`\bstatic\s+(mut\s+)?JJJ:\s*[^=\n]+\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["static test: u32 = 1234;", "static mut test: u32 = 1234;"],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`\bfn\s+.+\s*\((.+,\s+)?KEYWORD:\s*[^=\n]+\s*(,\s*.+)*\)`,
  emacsRegexp: String.raw`\bfn\s+.+\s*\((.+,\s+)?JJJ:\s*[^=\n]+\s*(,\s*.+)*\)`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "fn abc(test: u32) -> u32 {",
    "fn abc(x: u32, y: u32, test: Vec<u32>, z: Vec<Foo>)",
    "fn abc(x: u32, y: u32, test: &mut Vec<u32>, z: Vec<Foo>)",
  ],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`(if|while)\s+let\s+([^=\n]+)?(mut\s+)?KEYWORD([^=\n\(]+)?\s*=\s*[^=\n]+`,
  emacsRegexp: String
    .raw`(if|while)\s+let\s+([^=\n]+)?(mut\s+)?JJJ([^=\n\(]+)?\s*=\s*[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "if let Some(test) = abc() {",
    "if let Some(mut test) = abc() {",
    "if let Ok(test) = abc() {",
    "if let Ok(mut test) = abc() {",
    "if let Foo(mut test) = foo {",
    "if let test = abc() {",
    "if let Some(test) = abc()",
    "if let Some((a, test, b)) = abc()",
    "while let Some(test) = abc() {",
    "while let Some(mut test) = abc() {",
    "while let Ok(test) = abc() {",
    "while let Ok(mut test) = abc() {",
  ],
  specFailed: ["while let test(foo) = abc() {"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`struct\s+[^\n{]+[{][^}]*(\s*KEYWORD\s*:\s*[^\n},]+)[^}]*}`,
  emacsRegexp: String
    .raw`struct\s+[^\n{]+[{][^}]*(\s*JJJ\s*:\s*[^\n},]+)[^}]*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "struct Foo { abc: u32, test: Vec<String>, b: PathBuf }",
    "struct Foo<T>{test:Vec<T>}",
    "struct FooBar<'a> { test: Vec<String> }",
  ],
  specFailed: [
    "struct Foo { abc: u32, b: Vec<String> }",
    "/// ... construct the equivalent ...\nfn abc() {\n",
  ],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`enum\s+[^\n{]+\s*[{][^}]*\bKEYWORD\b[^}]*}`,
  emacsRegexp: String.raw`enum\s+[^\n{]+\s*[{][^}]*\bJJJ\b[^}]*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "enum Foo { VariantA, test, VariantB(u32) }",
    "enum Foo<T> { test(T) }",
    "enum BadStyle{test}",
    "enum Foo32 { Bar, testing, test(u8) }",
  ],
  specFailed: ["enum Foo { testing }"],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bfn\s+KEYWORD\s*\(`,
  emacsRegexp: String.raw`\bfn\s+JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["fn test(asdf: u32)", "fn test()", "pub fn test()"],
  specFailed: [],
});

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\bmacro_rules!\s+KEYWORD`,
  emacsRegexp: String.raw`\bmacro_rules!\s+JJJ`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["macro_rules! test"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`struct\s+KEYWORD\s*[{\(]?`,
  emacsRegexp: String.raw`struct\s+JJJ\s*[{\(]?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "struct test(u32, u32)",
    "struct test;",
    "struct test { abc: u32, def: Vec<String> }",
  ],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`trait\s+KEYWORD\s*[{]?`,
  emacsRegexp: String.raw`trait\s+JJJ\s*[{]?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["trait test;", "trait test { fn abc() -> u32; }"],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`\btype\s+KEYWORD([^=\n]+)?\s*=[^=\n]+;`,
  emacsRegexp: String.raw`\btype\s+JJJ([^=\n]+)?\s*=[^=\n]+;`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "type test<T> = Rc<RefCell<T>>;",
    "type test = Arc<RwLock<Vec<u32>>>;",
  ],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`impl\s+((\w+::)*\w+\s+for\s+)?(\w+::)*KEYWORD\s+[{]?`,
  emacsRegexp: String.raw`impl\s+((\w+::)*\w+\s+for\s+)?(\w+::)*JJJ\s+[{]?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "impl test {",
    "impl abc::test {",
    "impl std::io::Read for test {",
    "impl std::io::Read for abc::test {",
  ],
  specFailed: [],
});

definitions.push({
  type: "type",
  pcre2Regexp: String.raw`mod\s+KEYWORD\s*[{]?`,
  emacsRegexp: String.raw`mod\s+JJJ\s*[{]?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["mod test;", "pub mod test {"],
  specFailed: [],
});
