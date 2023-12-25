import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String
    .raw`\bKEYWORD(\s|\))*\((\w|[,&*.<>:]|\s)*(\))\s*(const|->|\{|$)|typedef\s+(\w|[(*]|\s)+KEYWORD(\)|\s)*\(`,
  emacsRegexp: String
    .raw`\bJJJ(\s|\))*\((\w|[,&*.<>:]|\s)*(\))\s*(const|->|\{|$)|typedef\s+(\w|[(*]|\s)+JJJ(\)|\s)*\(`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "int test(){",
    "my_struct (*test)(int a, int b){",
    "auto MyClass::test ( Builder::Builder& reference, ) -> decltype( builder.func() ) {",
    "int test( int *random_argument) const {",
    "test::test() {",
    "typedef int (*test)(int);",
  ],
  specFailed: [
    "return test();)",
    "int test(a, b);",
    "if( test() ) {",
    "else test();",
  ],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`(\b\w+|[,>])([*&]|\s)+KEYWORD\s*(\[([0-9]|\s)*\])*\s*([=,){;]|:\s*[0-9])|#define\s+KEYWORD\b`,
  emacsRegexp: String
    .raw`(\b\w+|[,>])([*&]|\s)+JJJ\s*(\[([0-9]|\s)*\])*\s*([=,){;]|:\s*[0-9])|#define\s+JJJ\b`,
  supports: ["grep"],
  specSuccess: [
    "int test=2;",
    "char *test;",
    "int x = 1, test = 2",
    "int test[20];",
    "#define test",
    "unsigned int test:2;",
  ],
  specFailed: [],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String
    .raw`\b(?!(class\b|struct\b|return\b|else\b|delete\b))(\w+|[,>])([*&]|\s)+KEYWORD\s*(\[(\d|\s)*\])*\s*([=,(){;]|:\s*\d)|#define\s+KEYWORD\b`,
  emacsRegexp: String
    .raw`\b(?!(class\b|struct\b|return\b|else\b|delete\b))(\w+|[,>])([*&]|\s)+JJJ\s*(\[(\d|\s)*\])*\s*([=,(){;]|:\s*\d)|#define\s+JJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: [
    "int test=2;",
    "char *test;",
    "int x = 1, test = 2",
    "int test[20];",
    "#define test",
    "typedef int test;",
    "unsigned int test:2",
  ],
  specFailed: ["return test;", "#define NOT test", "else test=2;"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String
    .raw`\b(class|struct|enum|union)\b\s*KEYWORD\b\s*(final\s*)?(:((\s*\w+\s*::)*\s*\w*\s*<?(\s*\w+\s*::)*\w+>?\s*,*)+)?((\{|$))|}\s*KEYWORD\b\s*;`,
  emacsRegexp: String
    .raw`\b(class|struct|enum|union)\b\s*JJJ\b\s*(final\s*)?(:((\s*\w+\s*::)*\s*\w*\s*<?(\s*\w+\s*::)*\w+>?\s*,*)+)?((\{|$))|}\s*JJJ\b\s*;`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "typedef struct test {",
    "enum test {",
    "} test;",
    "union test {",
    "class test final: public Parent1, private Parent2{",
    "class test : public std::vector<int> {",
  ],
  specFailed: ["union test var;", "struct test function() {"],
});
