type Definition = {
  type:
    | "function"
    | "string"
    | "variable"
    | "type"
    | "class"
    | "module"
    | "modifier"
    | "event"
    | "error"
    | "trait"
    | "interface"
    | "block"
    | "top level function"
    | "type-like"
    | "table"
    | "typeclass"
    | "command"
    | "view"
    | "counter"
    | "length"
    | "environment"
    | "message"
    | "enum"
    | "(data)type constructor 1"
    | "data/newtype record field";
  pcre2Regexp: string;
  emacsRegexp: string;
  supports: string[];
  specSuccess: string[];
  specFailed: string[];
};

export const definitions = new Map<string, Definition[]>([]);

function addDefinition(lang: string, definition: Definition): void {
  if (!definitions.has(lang)) {
    definitions.set(lang, []);
  }
  definitions.get(lang)!.push(definition);
}

addDefinition("elisp", {
  type: "function",
  pcre2Regexp: String.raw`\((defun|cl-defun)\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\((defun|cl-defun)\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    `(defun test (blah)`,
    `(defun test\n`,
    `(cl-defun test (blah)`,
    `(cl-defun test\n`,
  ],
  specFailed: [
    `(defun test-asdf (blah)`,
    `(defun test-blah\n`,
    `(cl-defun test-asdf (blah)`,
    `(cl-defun test-blah\n`,
    `(defun tester (blah)`,
    `(defun test? (blah)`,
    `(defun test- (blah)`,
  ],
});

addDefinition("elisp", {
  type: "function",
  pcre2Regexp: String.raw`\(defmacro\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defmacro\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [`(defmacro test (blah)`, `(defmacro test\n`],
  specFailed: [
    `(defmacro test-asdf (blah)`,
    `(defmacro test-blah\n`,
    `(defmacro tester (blah)`,
    `(defmacro test? (blah)`,
    `(defmacro test- (blah)`,
  ],
});

addDefinition("elisp", {
  type: "variable",
  pcre2Regexp: String.raw`\(defvar\b\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defvar\b\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defvar test ", "(defvar test\n"],
  specFailed: ["(defvar tester", "(defvar test?", "(defvar test-"],
});

addDefinition("elisp", {
  type: "variable",
  pcre2Regexp: String.raw`\(defcustom\b\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defcustom\b\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defcustom test ", "(defcustom test\n"],
  specFailed: ["(defcustom tester", "(defcustom test?", "(defcustom test-"],
});

addDefinition("elisp", {
  type: "variable",
  pcre2Regexp: String.raw`\(setq\b\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(setq\b\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(setq test 123)"],
  specFailed: [
    "setq test-blah 123)",
    "(setq tester",
    "(setq test?",
    "(setq test-",
  ],
});

addDefinition("elisp", {
  type: "variable",
  pcre2Regexp: String.raw`\(KEYWORD\s+`,
  emacsRegexp: String.raw`\(JJJ\s+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(let ((test 123)))"],
  specFailed: ["(let ((test-2 123)))"],
});

addDefinition("elisp", {
  type: "variable",
  pcre2Regexp: String
    .raw`\((defun|cl-defun)\s*.+\(?\s*KEYWORD($|[^a-zA-Z0-9\?\*-])\s*\)?`,
  emacsRegexp: String.raw`\((defun|cl-defun)\s*.+\(?\s*JJJ\j\s*\)?`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "(defun blah (test)",
    "(defun blah (test blah)",
    "(defun (blah test)",
  ],
  specFailed: [
    "(defun blah (test-1)",
    "(defun blah (test-2 blah)",
    "(defun (blah test-3)",
  ],
});

addDefinition("commonlisp", {
  type: "function",
  pcre2Regexp: String.raw`\(defun\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defun\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defun test (blah)", "(defun test\n"],
  specFailed: [
    "(defun test-asdf (blah)",
    "(defun test-blah\n",
    "(defun tester (blah)",
    "(defun test? (blah)",
    "(defun test- (blah)",
  ],
});

addDefinition("commonlisp", {
  type: "variable",
  pcre2Regexp: String.raw`\(defparameter\b\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defparameter\b\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defparameter test ", "(defparameter test\n"],
  specFailed: [
    "(defparameter tester",
    "(defparameter test?",
    "(defparameter test-",
  ],
});

addDefinition("racket", {
  type: "function",
  pcre2Regexp: String.raw`\(define\s+\(\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(define\s+\(\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define (test blah)", "(define (test\n"],
  specFailed: [
    "(define test blah",
    "(define (test-asdf blah)",
    "(define test (lambda (blah",
  ],
});

addDefinition("racket", {
  type: "function",
  pcre2Regexp: String.raw`\(define\s+KEYWORD\s*\(\s*lambda`,
  emacsRegexp: String.raw`\(define\s+JJJ\s*\(\s*lambda`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define test (lambda (blah", "(define test (lambda\n"],
  specFailed: [
    "(define test blah",
    "(define test-asdf (lambda (blah)",
    "(define (test)",
    "(define (test blah) (lambda (foo",
  ],
});

addDefinition("racket", {
  type: "function",
  pcre2Regexp: String.raw`\(let\s+KEYWORD\s*(\(|\[)*`,
  emacsRegexp: String.raw`\(let\s+JJJ\s*(\(|\[)*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "(let test ((blah foo) (bar bas))",
    "(let test\n",
    "(let test [(foo",
  ],
  specFailed: ["(let ((test blah"],
});

addDefinition("racket", {
  type: "variable",
  pcre2Regexp: String.raw`\(define\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(define\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define test ", "(define test\n"],
  specFailed: ["(define (test"],
});

addDefinition("racket", {
  type: "variable",
  pcre2Regexp: String.raw`(\(|\[)\s*KEYWORD\s+`,
  emacsRegexp: String.raw`(\(|\[)\s*JJJ\s+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "(let ((test 'foo",
    "(let [(test 'foo",
    "(let [(test 'foo",
    "(let [[test 'foo",
    "(let ((blah 'foo) (test 'bar)",
  ],
  specFailed: ["{test foo"],
});

addDefinition("racket", {
  type: "variable",
  pcre2Regexp: String
    .raw`\(lambda\s+\(?[^()]*\s*KEYWORD($|[^a-zA-Z0-9\?\*-])\s*\)?`,
  emacsRegexp: String.raw`\(lambda\s+\(?[^()]*\s*JJJ\j\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(lambda (test)", "(lambda (foo test)", "(lambda test (foo)"],
  specFailed: ["(lambda () test"],
});

addDefinition("racket", {
  type: "variable",
  pcre2Regexp: String
    .raw`\(define\s+\([^()]+\s*KEYWORD($|[^a-zA-Z0-9\?\*-])\s*\)?`,
  emacsRegexp: String.raw`\(define\s+\([^()]+\s*JJJ\j\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define (foo test)", "(define (foo test bar)"],
  specFailed: ["(define foo test", "(define (test foo", "(define (test)"],
});

addDefinition("racket", {
  type: "type",
  pcre2Regexp: String.raw`\(struct\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(struct\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(struct test (a b)"],
  specFailed: [],
});

addDefinition("scheme", {
  type: "function",
  pcre2Regexp: String.raw`\(define\s+\(\s*KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(define\s+\(\s*JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define (test blah)", "(define (test\n"],
  specFailed: [
    "(define test blah",
    "(define (test-asdf blah)",
    "(define test (lambda (blah",
  ],
});

addDefinition("scheme", {
  type: "function",
  pcre2Regexp: String.raw`\(define\s+KEYWORD\s*\(\s*lambda`,
  emacsRegexp: String.raw`\(define\s+JJJ\s*\(\s*lambda`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define test (lambda (blah", "(define test (lambda\n"],
  specFailed: [
    "(define test blah",
    "(define test-asdf (lambda (blah)",
    "(define (test)",
    "(define (test blah) (lambda (foo",
  ],
});

addDefinition("scheme", {
  type: "function",
  pcre2Regexp: String.raw`\(let\s+KEYWORD\s*(\(|\[)*`,
  emacsRegexp: String.raw`\(let\s+JJJ\s*(\(|\[)*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "(let test ((blah foo) (bar bas))",
    "(let test\n",
    "(let test [(foo",
  ],
  specFailed: ["(let ((test blah"],
});

addDefinition("scheme", {
  type: "variable",
  pcre2Regexp: String.raw`\(define\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(define\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define test ", "(define test\n"],
  specFailed: ["(define (test"],
});

addDefinition("scheme", {
  type: "variable",
  pcre2Regexp: String.raw`(\(|\[)\s*KEYWORD\s+`,
  emacsRegexp: String.raw`(\(|\[)\s*JJJ\s+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "(let ((test 'foo",
    "(let [(test 'foo",
    "(let [(test 'foo",
    "(let [[test 'foo",
    "(let ((blah 'foo) (test 'bar)",
  ],
  specFailed: ["{test foo"],
});

addDefinition("scheme", {
  type: "variable",
  pcre2Regexp: String
    .raw`\(lambda\s+\(?[^()]*\s*KEYWORD($|[^a-zA-Z0-9\?\*-])\s*\)?`,
  emacsRegexp: String.raw`\(lambda\s+\(?[^()]*\s*JJJ\j\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(lambda (test)", "(lambda (foo test)", "(lambda test (foo)"],
  specFailed: ["(lambda () test"],
});

addDefinition("scheme", {
  type: "variable",
  pcre2Regexp: String
    .raw`\(define\s+\([^()]+\s*KEYWORD($|[^a-zA-Z0-9\?\*-])\s*\)?`,
  emacsRegexp: String.raw`\(define\s+\([^()]+\s*JJJ\j\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(define (foo test)", "(define (foo test bar)"],
  specFailed: ["(define foo test", "(define (test foo", "(define (test)"],
});

addDefinition("cpp", {
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

addDefinition("cpp", {
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

addDefinition("cpp", {
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

addDefinition("cpp", {
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

addDefinition("clojure", {
  type: "variable",
  pcre2Regexp: String.raw`\(def\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(def\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(def test (foo)"],
  specFailed: [],
});

addDefinition("clojure", {
  type: "function",
  pcre2Regexp: String.raw`\(defn-?\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defn-?\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defn test [foo]", "(defn- test [foo]"],
  specFailed: ["(defn test? [foo]", "(defn- test? [foo]"],
});

addDefinition("clojure", {
  type: "function",
  pcre2Regexp: String.raw`\(defmacro\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defmacro\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defmacro test [foo]"],
  specFailed: [],
});

addDefinition("clojure", {
  type: "function",
  pcre2Regexp: String.raw`\(deftask\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(deftask\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(deftask test [foo]"],
  specFailed: [],
});

addDefinition("clojure", {
  type: "type",
  pcre2Regexp: String.raw`\(deftype\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(deftype\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(deftype test [foo]"],
  specFailed: [],
});

addDefinition("clojure", {
  type: "type",
  pcre2Regexp: String.raw`\(defmulti\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defmulti\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defmulti test fn"],
  specFailed: [],
});

addDefinition("clojure", {
  type: "type",
  pcre2Regexp: String.raw`\(defmethod\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defmethod\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defmethod test type"],
  specFailed: [],
});

addDefinition("clojure", {
  type: "type",
  pcre2Regexp: String.raw`\(definterface\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(definterface\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(definterface test (foo)"],
  specFailed: [],
});

addDefinition("clojure", {
  type: "type",
  pcre2Regexp: String.raw`\(defprotocol\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defprotocol\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defprotocol test (foo)"],
  specFailed: [],
});

addDefinition("clojure", {
  type: "type",
  pcre2Regexp: String.raw`\(defrecord\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(defrecord\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(defrecord test [foo]"],
  specFailed: [],
});

addDefinition("coffeescript", {
  type: "function",
  pcre2Regexp: String.raw`^\s*KEYWORD\s*[=:].*[-=]>`,
  emacsRegexp: String.raw`^\s*JJJ\s*[=:].*[-=]>`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "test = ()  =>",
    "test= =>",
    "test = ->",
    "test=()->",
    "test : ()  =>",
    "test: =>",
    "test : ->",
    "test:()->",
  ],
  specFailed: ["# test = =>", "test = 1"],
});

addDefinition("coffeescript", {
  type: "variable",
  pcre2Regexp: String.raw`^\s*KEYWORD\s*[:=][^:=-][^>]+$`,
  emacsRegexp: String.raw`^\s*JJJ\s*[:=][^:=-][^>]+$`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = $", "test : [", "test = {", "test = a"],
  specFailed: ["test::a", "test: =>", "test == 1", "# test = 1"],
});

addDefinition("coffeescript", {
  type: "class",
  pcre2Regexp: String.raw`^\s*\bclass\s+KEYWORD`,
  emacsRegexp: String.raw`^\s*\bclass\s+JJJ`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test", "class test extends"],
  specFailed: ["# class"],
});

addDefinition("objc", {
  type: "function",
  pcre2Regexp: String.raw`\)\s*KEYWORD(:|\b|\s)`,
  emacsRegexp: String.raw`\)\s*JJJ(:|\b|\s)`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["- (void)test", "- (void)test:(UIAlertView *)alertView"],
  specFailed: ["- (void)testnot", "- (void)testnot:(UIAlertView *)alertView"],
});

addDefinition("objc", {
  type: "variable",
  pcre2Regexp: String.raw`\b\*?KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\b\*?JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ['NSString *test = @"asdf"'],
  specFailed: ['NSString *testnot = @"asdf"', 'NSString *nottest = @"asdf"'],
});

addDefinition("objc", {
  type: "type",
  pcre2Regexp: String
    .raw`(@interface|@protocol|@implementation)\b\s*KEYWORD\b\s*`,
  emacsRegexp: String.raw`(@interface|@protocol|@implementation)\b\s*JJJ\b\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["@interface test: UIWindow"],
  specFailed: ["@interface testnon: UIWindow"],
});

addDefinition("objc", {
  type: "type",
  pcre2Regexp: String
    .raw`typedef\b\s+(NS_OPTIONS|NS_ENUM)\b\([^,]+?,\s*KEYWORD\b\s*`,
  emacsRegexp: String
    .raw`typedef\b\s+(NS_OPTIONS|NS_ENUM)\b\([^,]+?,\s*JJJ\b\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["typedef NS_ENUM(NSUInteger, test)"],
  specFailed: ["typedef NS_ENUMD(NSUInteger, test)"],
});

addDefinition("swift", {
  type: "variable",
  pcre2Regexp: String.raw`(let|var)\s*KEYWORD\s*(=|:)[^=:\n]+`,
  emacsRegexp: String.raw`(let|var)\s*JJJ\s*(=|:)[^=:\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "let test = 1234",
    "var test = 1234",
    "private lazy var test: UITapGestureRecognizer",
  ],
  specFailed: ["if test == 1234:"],
});

addDefinition("swift", {
  type: "function",
  pcre2Regexp: String.raw`func\s+KEYWORD\b\s*(<[^>]*>)?\s*\(`,
  emacsRegexp: String.raw`func\s+JJJ\b\s*(<[^>]*>)?\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "func test(asdf)",
    "func test()",
    "func test<Value: Protocol>()",
  ],
  specFailed: ["func testnot(asdf)", "func testnot()"],
});

addDefinition("swift", {
  type: "type",
  pcre2Regexp: String.raw`(class|struct|protocol|enum)\s+KEYWORD\b\s*?`,
  emacsRegexp: String.raw`(class|struct|protocol|enum)\s+JJJ\b\s*?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "struct test",
    "struct test: Codable",
    "struct test<Value: Codable>",
    "class test:",
    "class test: UIWindow",
    "class test<Value: Codable>",
  ],
  specFailed: [
    "class testnot:",
    "class testnot(object):",
    "struct testnot(object)",
  ],
});

addDefinition("swift", {
  type: "type",
  pcre2Regexp: String.raw`(typealias)\s+KEYWORD\b\s*?=`,
  emacsRegexp: String.raw`(typealias)\s+JJJ\b\s*?=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["typealias test ="],
  specFailed: ["typealias testnot"],
});

addDefinition("csharp", {
  type: "function",
  pcre2Regexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}KEYWORD\s*\(`,
  emacsRegexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}JJJ\s*\(`,
  supports: ["ag", "rg"],
  specSuccess: [
    "int test()",
    "int test(param)",
    "static int test()",
    "static int test(param)",
    "public static MyType test()",
    "private virtual SomeType test(param)",
    "static int test()",
  ],
  specFailed: ["test()", "testnot()", "blah = new test()"],
});

addDefinition("csharp", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n)]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n)]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["int test = 1234"],
  specFailed: ["if test == 1234:", "int nottest = 44"],
});

addDefinition("csharp", {
  type: "type",
  pcre2Regexp: String.raw`(class|interface)\s*KEYWORD\b`,
  emacsRegexp: String.raw`(class|interface)\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test:", "public class test : IReadableChannel, I"],
  specFailed: [
    "class testnot:",
    "public class testnot : IReadableChannel, I",
  ],
});

addDefinition("java", {
  type: "function",
  pcre2Regexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}KEYWORD\s*\(`,
  emacsRegexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}JJJ\s*\(`,
  supports: ["ag", "rg"],
  specSuccess: [
    "int test()",
    "int test(param)",
    "static int test()",
    "static int test(param)",
    "public static MyType test()",
    "private virtual SomeType test(param)",
    "static int test()",
    "private foo[] test()",
  ],
  specFailed: [
    "test()",
    "testnot()",
    "blah = new test()",
    "foo bar = test()",
  ],
});

addDefinition("java", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n)]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n)]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["int test = 1234"],
  specFailed: ["if test == 1234:", "int nottest = 44"],
});

addDefinition("java", {
  type: "type",
  pcre2Regexp: String.raw`(class|interface)\s*KEYWORD\b`,
  emacsRegexp: String.raw`(class|interface)\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test:", "public class test implements Something"],
  specFailed: ["class testnot:", "public class testnot implements Something"],
});

addDefinition("vala", {
  type: "function",
  pcre2Regexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}KEYWORD\s*\(`,
  emacsRegexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}JJJ\s*\(`,
  supports: ["ag", "rg"],
  specSuccess: [
    "int test()",
    "int test(param)",
    "static int test()",
    "static int test(param)",
    "public static MyType test()",
    "private virtual SomeType test(param)",
    "static int test()",
  ],
  specFailed: ["test()", "testnot()", "blah = new test()"],
});

addDefinition("vala", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n)]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n)]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["int test = 1234"],
  specFailed: ["if test == 1234:", "int nottest = 44"],
});

addDefinition("vala", {
  type: "type",
  pcre2Regexp: String.raw`(class|interface)\s*KEYWORD\b`,
  emacsRegexp: String.raw`(class|interface)\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test:", "public class test : IReadableChannel, I"],
  specFailed: [
    "class testnot:",
    "public class testnot : IReadableChannel, I",
  ],
});

addDefinition("coq", {
  type: "function",
  pcre2Regexp: String.raw`\s*Variable\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Variable\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Variable test"],
  specFailed: ["Variable testx"],
});

addDefinition("coq", {
  type: "function",
  pcre2Regexp: String.raw`\s*Inductive\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Inductive\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Inductive test"],
  specFailed: ["Inductive testx"],
});

addDefinition("coq", {
  type: "function",
  pcre2Regexp: String.raw`\s*Lemma\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Lemma\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Lemma test"],
  specFailed: ["Lemma testx"],
});

addDefinition("coq", {
  type: "function",
  pcre2Regexp: String.raw`\s*Definition\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Definition\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Definition test"],
  specFailed: ["Definition testx"],
});

addDefinition("coq", {
  type: "function",
  pcre2Regexp: String.raw`\s*Hypothesis\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Hypothesis\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Hypothesis test"],
  specFailed: ["Hypothesis testx"],
});

addDefinition("coq", {
  type: "function",
  pcre2Regexp: String.raw`\s*Theorm\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Theorm\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Theorm test"],
  specFailed: ["Theorm testx"],
});

addDefinition("coq", {
  type: "function",
  pcre2Regexp: String.raw`\s*Fixpoint\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Fixpoint\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Fixpoint test"],
  specFailed: ["Fixpoint testx"],
});

addDefinition("coq", {
  type: "function",
  pcre2Regexp: String.raw`\s*Module\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*Module\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["Module test"],
  specFailed: ["Module testx"],
});

addDefinition("coq", {
  type: "function",
  pcre2Regexp: String.raw`\s*CoInductive\s+KEYWORD\b`,
  emacsRegexp: String.raw`\s*CoInductive\s+JJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["CoInductive test"],
  specFailed: ["CoInductive testx"],
});

addDefinition("python", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test == 1234:", "_test = 1234"],
});

addDefinition("python", {
  type: "function",
  pcre2Regexp: String.raw`def\s*KEYWORD\b\s*\(`,
  emacsRegexp: String.raw`def\s*JJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["\tdef test(asdf)", "def test()"],
  specFailed: ["\tdef testnot(asdf)", "def testnot()"],
});

addDefinition("python", {
  type: "type",
  pcre2Regexp: String.raw`class\s*KEYWORD\b\s*\(?`,
  emacsRegexp: String.raw`class\s*JJJ\b\s*\(?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test(object):", "class test:"],
  specFailed: ["class testnot:", "class testnot(object):"],
});

addDefinition("matlab", {
  type: "variable",
  pcre2Regexp: String.raw`^\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`^\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["for test = 1:2:", "_test = 1234"],
});

addDefinition("matlab", {
  type: "function",
  pcre2Regexp: String.raw`^\s*function\s*[^=]+\s*=\s*KEYWORD\b`,
  emacsRegexp: String.raw`^\s*function\s*[^=]+\s*=\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "\tfunction y = test(asdf)",
    "function x = test()",
    "function [x, losses] = test(A, y, lambda, method, qtile)",
  ],
  specFailed: ["\tfunction testnot(asdf)", "function testnot()"],
});

addDefinition("matlab", {
  type: "type",
  pcre2Regexp: String.raw`^\s*classdef\s*KEYWORD\b\s*`,
  emacsRegexp: String.raw`^\s*classdef\s*JJJ\b\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["classdef test"],
  specFailed: ["classdef testnot"],
});

addDefinition("nim", {
  type: "variable",
  pcre2Regexp: String.raw`(const|let|var)\s*KEYWORD\*?\s*(=|:)[^=:\n]+`,
  emacsRegexp: String.raw`(const|let|var)\s*JJJ\*?\s*(=|:)[^=:\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "let test = 1234",
    "var test = 1234",
    "var test: Stat",
    "const test = 1234",
    "const test* = 1234",
  ],
  specFailed: ["if test == 1234:"],
});

addDefinition("nim", {
  type: "function",
  pcre2Regexp: String.raw`(proc|func|macro|template)\s*\`?KEYWORD\`?\b\*?\s*\(`,
  emacsRegexp: String.raw`(proc|func|macro|template)\s*\`?JJJ\`?\b\*?\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "\tproc test(asdf)",
    "proc test()",
    "func test()",
    "macro test()",
    "template test()",
    "proc test*()",
  ],
  specFailed: ["\tproc testnot(asdf)", "proc testnot()"],
});

addDefinition("nim", {
  type: "type",
  pcre2Regexp: String.raw`type\s*KEYWORD\b\*?\s*(\{[^}]+\})?\s*=\s*\w+`,
  emacsRegexp: String.raw`type\s*JJJ\b\*?\s*(\{[^}]+\})?\s*=\s*\w+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "type test = object",
    "type test {.pure.} = enum",
    "type test* = ref object",
  ],
  specFailed: ["type testnot = object"],
});

addDefinition("nix", {
  type: "variable",
  pcre2Regexp: String.raw`\b\s*KEYWORD\s*=[^=;]+`,
  emacsRegexp: String.raw`\b\s*JJJ\s*=[^=;]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234;", "test = 123;", "test=123"],
  specFailed: ["testNot = 1234;", "Nottest = 1234;", "AtestNot = 1234;"],
});

addDefinition("ruby", {
  type: "variable",
  pcre2Regexp: String
    .raw`^\s*((\w+[.])*\w+,\s*)*KEYWORD(,\s*(\w+[.])*\w+)*\s*=([^=>~]|$)`,
  emacsRegexp: String
    .raw`^\s*((\w+[.])*\w+,\s*)*JJJ(,\s*(\w+[.])*\w+)*\s*=([^=>~]|$)`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["test = 1234", "self.foo, test, bar = args"],
  specFailed: ["if test == 1234", "foo_test = 1234"],
});

addDefinition("ruby", {
  type: "function",
  pcre2Regexp: String
    .raw`(^|[^\w.])((private|public|protected)\s+)?def\s+(\w+(::|[.]))*KEYWORD($|[^\w|:])`,
  emacsRegexp: String
    .raw`(^|[^\w.])((private|public|protected)\s+)?def\s+(\w+(::|[.]))*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "def test(foo)",
    "def test()",
    "def test foo",
    "def test; end",
    "def self.test()",
    "def MODULE::test()",
    "private def test",
  ],
  specFailed: ["def test_foo"],
});

addDefinition("ruby", {
  type: "function",
  pcre2Regexp: String
    .raw`(^|\W)define(_singleton|_instance)?_method(\s|[(])\s*:KEYWORD($|[^\w|:])`,
  emacsRegexp: String
    .raw`(^|\W)define(_singleton|_instance)?_method(\s|[(])\s*:JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "define_method(:test, &body)",
    "mod.define_instance_method(:test) { body }",
  ],
  specFailed: [],
});

addDefinition("ruby", {
  type: "type",
  pcre2Regexp: String.raw`(^|[^\w.])class\s+(\w*::)*KEYWORD($|[^\w|:])`,
  emacsRegexp: String.raw`(^|[^\w.])class\s+(\w*::)*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["class test", "class Foo::test"],
  specFailed: [],
});

addDefinition("ruby", {
  type: "type",
  pcre2Regexp: String.raw`(^|[^\w.])module\s+(\w*::)*KEYWORD($|[^\w|:])`,
  emacsRegexp: String.raw`(^|[^\w.])module\s+(\w*::)*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["module test", "module Foo::test"],
  specFailed: [],
});

addDefinition("ruby", {
  type: "function",
  pcre2Regexp: String.raw`(^|\W)alias(_method)?\W+KEYWORD(\W|$)`,
  emacsRegexp: String.raw`(^|\W)alias(_method)?\W+JJJ(\W|$)`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "alias test some_method",
    "alias_method :test, :some_method",
    "alias_method 'test' 'some_method'",
    "some_class.send(:alias_method, :test, :some_method)",
  ],
  specFailed: [
    "alias some_method test",
    "alias_method :some_method, :test",
    "alias test_foo test",
  ],
});

addDefinition("groovy", {
  type: "variable",
  pcre2Regexp: String
    .raw`^\s*((\w+[.])*\w+,\s*)*KEYWORD(,\s*(\w+[.])*\w+)*\s*=([^=>~]|$)`,
  emacsRegexp: String
    .raw`^\s*((\w+[.])*\w+,\s*)*JJJ(,\s*(\w+[.])*\w+)*\s*=([^=>~]|$)`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["test = 1234", "self.foo, test, bar = args"],
  specFailed: ["if test == 1234", "foo_test = 1234"],
});

addDefinition("groovy", {
  type: "function",
  pcre2Regexp: String
    .raw`(^|[^\w.])((private|public)\s+)?def\s+(\w+(::|[.]))*KEYWORD($|[^\w|:])`,
  emacsRegexp: String
    .raw`(^|[^\w.])((private|public)\s+)?def\s+(\w+(::|[.]))*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "def test(foo)",
    "def test()",
    "def test foo",
    "def test; end",
    "def self.test()",
    "def MODULE::test()",
    "private def test",
  ],
  specFailed: ["def test_foo"],
});

addDefinition("groovy", {
  type: "type",
  pcre2Regexp: String.raw`(^|[^\w.])class\s+(\w*::)*KEYWORD($|[^\w|:])`,
  emacsRegexp: String.raw`(^|[^\w.])class\s+(\w*::)*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["class test", "class Foo::test"],
  specFailed: [],
});

addDefinition("crystal", {
  type: "variable",
  pcre2Regexp: String
    .raw`^\s*((\w+[.])*\w+,\s*)*KEYWORD(,\s*(\w+[.])*\w+)*\s*=([^=>~]|$)`,
  emacsRegexp: String
    .raw`^\s*((\w+[.])*\w+,\s*)*JJJ(,\s*(\w+[.])*\w+)*\s*=([^=>~]|$)`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["test = 1234", "self.foo, test, bar = args"],
  specFailed: ["if test == 1234", "foo_test = 1234"],
});

addDefinition("crystal", {
  type: "function",
  pcre2Regexp: String
    .raw`(^|[^\w.])((private|public|protected)\s+)?def\s+(\w+(::|[.]))*KEYWORD($|[^\w|:])`,
  emacsRegexp: String
    .raw`(^|[^\w.])((private|public|protected)\s+)?def\s+(\w+(::|[.]))*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "def test(foo)",
    "def test()",
    "def test foo",
    "def test; end",
    "def self.test()",
    "def MODULE::test()",
    "private def test",
  ],
  specFailed: ["def test_foo"],
});

addDefinition("crystal", {
  type: "type",
  pcre2Regexp: String.raw`(^|[^\w.])class\s+(\w*::)*KEYWORD($|[^\w|:])`,
  emacsRegexp: String.raw`(^|[^\w.])class\s+(\w*::)*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["class test", "class Foo::test"],
  specFailed: [],
});

addDefinition("crystal", {
  type: "type",
  pcre2Regexp: String.raw`(^|[^\w.])module\s+(\w*::)*KEYWORD($|[^\w|:])`,
  emacsRegexp: String.raw`(^|[^\w.])module\s+(\w*::)*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["module test", "module Foo::test"],
  specFailed: [],
});

addDefinition("crystal", {
  type: "type",
  pcre2Regexp: String.raw`(^|[^\w.])struct\s+(\w*::)*KEYWORD($|[^\w|:])`,
  emacsRegexp: String.raw`(^|[^\w.])struct\s+(\w*::)*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["struct test", "struct Foo::test"],
  specFailed: [],
});

addDefinition("crystal", {
  type: "type",
  pcre2Regexp: String.raw`(^|[^\w.])alias\s+(\w*::)*KEYWORD($|[^\w|:])`,
  emacsRegexp: String.raw`(^|[^\w.])alias\s+(\w*::)*JJJ($|[^\w|:])`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["alias test", "alias Foo::test"],
  specFailed: [],
});

addDefinition("scad", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test == 1234 {"],
});

addDefinition("scad", {
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["function test()", "function test ()"],
  specFailed: [],
});

addDefinition("scad", {
  type: "module",
  pcre2Regexp: String.raw`module\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`module\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["module test()", "module test ()"],
  specFailed: [],
});

addDefinition("scala", {
  type: "variable",
  pcre2Regexp: String.raw`\bval\s*KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\bval\s*JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["val test = 1234"],
  specFailed: ["case test => 1234"],
});

addDefinition("scala", {
  type: "variable",
  pcre2Regexp: String.raw`\bvar\s*KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\bvar\s*JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["var test = 1234"],
  specFailed: ["case test => 1234"],
});

addDefinition("scala", {
  type: "variable",
  pcre2Regexp: String.raw`\btype\s*KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\btype\s*JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["type test = 1234"],
  specFailed: ["case test => 1234"],
});

addDefinition("scala", {
  type: "function",
  pcre2Regexp: String.raw`\bdef\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`\bdef\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["def test(asdf)", "def test()"],
  specFailed: [],
});

addDefinition("scala", {
  type: "type",
  pcre2Regexp: String.raw`class\s*KEYWORD\s*\(?`,
  emacsRegexp: String.raw`class\s*JJJ\s*\(?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test(object)"],
  specFailed: [],
});

addDefinition("scala", {
  type: "type",
  pcre2Regexp: String.raw`trait\s*KEYWORD\s*\(?`,
  emacsRegexp: String.raw`trait\s*JJJ\s*\(?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["trait test(object)"],
  specFailed: [],
});

addDefinition("scala", {
  type: "type",
  pcre2Regexp: String.raw`object\s*KEYWORD\s*\(?`,
  emacsRegexp: String.raw`object\s*JJJ\s*\(?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["object test(object)"],
  specFailed: [],
});

addDefinition("solidity", {
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function test() internal",
    "function test (uint x, address y)",
    "function test() external",
  ],
  specFailed: [],
});

addDefinition("solidity", {
  type: "modifier",
  pcre2Regexp: String.raw`modifier\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`modifier\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["modifier test()", "modifier test ()"],
  specFailed: [],
});

addDefinition("solidity", {
  type: "event",
  pcre2Regexp: String.raw`event\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`event\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "event test();",
    "event test (uint indexed x)",
    "event test(uint x, address y)",
  ],
  specFailed: [],
});

addDefinition("solidity", {
  type: "error",
  pcre2Regexp: String.raw`error\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`error\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "error test();",
    "error test (uint x)",
    "error test(uint x, address y)",
  ],
  specFailed: [],
});

addDefinition("r", {
  type: "variable",
  pcre2Regexp: String.raw`\bKEYWORD\s*=[^=><]`,
  emacsRegexp: String.raw`\bJJJ\s*=[^=><]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if (test == 1234)"],
});

addDefinition("r", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*<-\s*function\b`,
  emacsRegexp: String.raw`\bJJJ\s*<-\s*function\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test <- function", "test <- function("],
  specFailed: ["test <- functionX"],
});

addDefinition("perl", {
  type: "function",
  pcre2Regexp: String.raw`sub\s*KEYWORD\s*(\{|\()`,
  emacsRegexp: String.raw`sub\s*JJJ\s*(\{|\()`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["sub test{", "sub test {", "sub test(", "sub test ("],
  specFailed: [],
});

addDefinition("perl", {
  type: "variable",
  pcre2Regexp: String.raw`KEYWORD\s*=\s*`,
  emacsRegexp: String.raw`JJJ\s*=\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["$test = 1234"],
  specFailed: [],
});

addDefinition("tcl", {
  type: "function",
  pcre2Regexp: String.raw`proc\s+KEYWORD\s*\{`,
  emacsRegexp: String.raw`proc\s+JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["proc test{", "proc test {"],
  specFailed: [],
});

addDefinition("tcl", {
  type: "variable",
  pcre2Regexp: String.raw`set\s+KEYWORD`,
  emacsRegexp: String.raw`set\s+JJJ`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["set test 1234"],
  specFailed: [],
});

addDefinition("tcl", {
  type: "variable",
  pcre2Regexp: String.raw`(variable|global)\s+KEYWORD`,
  emacsRegexp: String.raw`(variable|global)\s+JJJ`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["variable test", "global test"],
  specFailed: [],
});

addDefinition("shell", {
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*`,
  emacsRegexp: String.raw`function\s*JJJ\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["function test{", "function test {", "function test () {"],
  specFailed: ["function nottest {"],
});

addDefinition("shell", {
  type: "function",
  pcre2Regexp: String.raw`KEYWORD\(\)\s*\{`,
  emacsRegexp: String.raw`JJJ\(\)\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test() {"],
  specFailed: ["testx() {"],
});

addDefinition("shell", {
  type: "variable",
  pcre2Regexp: String.raw`\bKEYWORD\s*=\s*`,
  emacsRegexp: String.raw`\bJJJ\s*=\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["blahtest = 1234"],
});

addDefinition("php", {
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["function test()", "function test ()"],
  specFailed: [],
});

addDefinition("php", {
  type: "function",
  pcre2Regexp: String.raw`\*\s@method\s+[^ 	]+\s+KEYWORD\(`,
  emacsRegexp: String.raw`\*\s@method\s+[^ 	]+\s+JJJ\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "/** @method string|false test($a)",
    " * @method bool test()",
  ],
  specFailed: [],
});

addDefinition("php", {
  type: "variable",
  pcre2Regexp: String.raw`(\s|->|\$|::)KEYWORD\s*=\s*`,
  emacsRegexp: String.raw`(\s|->|\$|::)JJJ\s*=\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["$test = 1234", "$foo->test = 1234"],
  specFailed: [],
});

addDefinition("php", {
  type: "variable",
  pcre2Regexp: String
    .raw`\*\s@property(-read|-write)?\s+([^ 	]+\s+)&?\$KEYWORD(\s+|$)`,
  emacsRegexp: String
    .raw`\*\s@property(-read|-write)?\s+([^ 	]+\s+)&?\$JJJ(\s+|$)`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "/** @property string $test",
    "/** @property string $test description for $test property",
    " * @property-read bool|bool $test",
    " * @property-write \\ArrayObject<string,resource[]> $test",
  ],
  specFailed: [],
});

addDefinition("php", {
  type: "trait",
  pcre2Regexp: String.raw`trait\s*KEYWORD\s*\{`,
  emacsRegexp: String.raw`trait\s*JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["trait test{", "trait test {"],
  specFailed: [],
});

addDefinition("php", {
  type: "interface",
  pcre2Regexp: String.raw`interface\s*KEYWORD\s*\{`,
  emacsRegexp: String.raw`interface\s*JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["interface test{", "interface test {"],
  specFailed: [],
});

addDefinition("php", {
  type: "class",
  pcre2Regexp: String.raw`class\s*KEYWORD\s*(extends|implements|\{)`,
  emacsRegexp: String.raw`class\s*JJJ\s*(extends|implements|\{)`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "class test{",
    "class test {",
    "class test extends foo",
    "class test implements foo",
  ],
  specFailed: [],
});

addDefinition("dart", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*\([^()]*\)\s*[{]`,
  emacsRegexp: String.raw`\bJJJ\s*\([^()]*\)\s*[{]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test(foo) {", "test (foo){", "test(foo){"],
  specFailed: [],
});

addDefinition("dart", {
  type: "function",
  pcre2Regexp: String.raw`class\s*KEYWORD\s*[\(\{]`,
  emacsRegexp: String.raw`class\s*JJJ\s*[\(\{]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test(object) {", "class test{"],
  specFailed: [],
});

addDefinition("faust", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD(\(.+\))*\s*=`,
  emacsRegexp: String.raw`\bJJJ(\(.+\))*\s*=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = osc + 0.5;", "test(freq) = osc(freq) + 0.5;"],
  specFailed: [],
});

addDefinition("fennel", {
  type: "variable",
  pcre2Regexp: String.raw`\((local|var)\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\((local|var)\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(local test (foo)", "(var test (foo)"],
  specFailed: [],
});

addDefinition("fennel", {
  type: "function",
  pcre2Regexp: String.raw`\(fn\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(fn\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(fn test [foo]"],
  specFailed: ["(fn test? [foo]"],
});

addDefinition("fennel", {
  type: "function",
  pcre2Regexp: String.raw`\(macro\s+KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\(macro\s+JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["(macro test [foo]"],
  specFailed: [],
});

addDefinition("fortran", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if (test == 1234)"],
});

addDefinition("fortran", {
  type: "function",
  pcre2Regexp: String
    .raw`\b(function|subroutine|FUNCTION|SUBROUTINE)\s+KEYWORD\b\s*\(`,
  emacsRegexp: String
    .raw`\b(function|subroutine|FUNCTION|SUBROUTINE)\s+JJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function test (foo)",
    "integer function test(foo)",
    "subroutine test (foo, bar)",
    "FUNCTION test (foo)",
    "INTEGER FUNCTION test(foo)",
    "SUBROUTINE test (foo, bar)",
  ],
  specFailed: [
    "end function test",
    "end subroutine test",
    "END FUNCTION test",
    "END SUBROUTINE test",
  ],
});

addDefinition("fortran", {
  type: "function",
  pcre2Regexp: String.raw`^\s*(interface|INTERFACE)\s+KEYWORD\b`,
  emacsRegexp: String.raw`^\s*(interface|INTERFACE)\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["interface test", "INTERFACE test"],
  specFailed: [
    "interface test2",
    "end interface test",
    "INTERFACE test2",
    "END INTERFACE test",
  ],
});

addDefinition("fortran", {
  type: "type",
  pcre2Regexp: String.raw`^\s*(module|MODULE)\s+KEYWORD\s*`,
  emacsRegexp: String.raw`^\s*(module|MODULE)\s+JJJ\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["module test", "MODULE test"],
  specFailed: ["end module test", "END MODULE test"],
});

addDefinition("go", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test == 1234 {"],
});

addDefinition("go", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*:=\s*`,
  emacsRegexp: String.raw`\s*\bJJJ\s*:=\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test := 1234"],
  specFailed: [],
});

addDefinition("go", {
  type: "function",
  pcre2Regexp: String.raw`func\s+\([^\)]*\)\s+KEYWORD\s*\(`,
  emacsRegexp: String.raw`func\s+\([^\)]*\)\s+JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["func (s *blah) test(filename string) string {"],
  specFailed: [],
});

addDefinition("go", {
  type: "function",
  pcre2Regexp: String.raw`func\s+KEYWORD\s*\(`,
  emacsRegexp: String.raw`func\s+JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["func test(url string) (string, error)"],
  specFailed: [],
});

addDefinition("go", {
  type: "type",
  pcre2Regexp: String.raw`type\s+KEYWORD\s+struct\s+\{`,
  emacsRegexp: String.raw`type\s+JJJ\s+struct\s+\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["type test struct {"],
  specFailed: [],
});

addDefinition("javascript", {
  type: "function",
  pcre2Regexp: String.raw`(service|factory)\(['\"]KEYWORD['\"]`,
  emacsRegexp: String.raw`(service|factory)\(['\"]JJJ['\"]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "module.factory('test', [\"$rootScope\", function($rootScope) {",
  ],
  specFailed: [],
});

addDefinition("javascript", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*[=:]\s*\([^\)]*\)\s+=>`,
  emacsRegexp: String.raw`\bJJJ\s*[=:]\s*\([^\)]*\)\s+=>`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "const test = (foo) => ",
    "test: (foo) => {",
    "  test: (foo) => {",
  ],
  specFailed: [],
});

addDefinition("javascript", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*\([^()]*\)\s*[{]`,
  emacsRegexp: String.raw`\bJJJ\s*\([^()]*\)\s*[{]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test(foo) {", "test (foo){", "test(foo){"],
  specFailed: ["test = blah.then(function(){"],
});

addDefinition("javascript", {
  type: "function",
  pcre2Regexp: String.raw`class\s*KEYWORD\s*[\(\{]`,
  emacsRegexp: String.raw`class\s*JJJ\s*[\(\{]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test(object) {", "class test{"],
  specFailed: [],
});

addDefinition("javascript", {
  type: "function",
  pcre2Regexp: String.raw`class\s*KEYWORD\s+extends`,
  emacsRegexp: String.raw`class\s*JJJ\s+extends`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test extends Component{"],
  specFailed: [],
});

addDefinition("javascript", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234", "const test = props =>"],
  specFailed: ["if (test === 1234)"],
});

addDefinition("javascript", {
  type: "variable",
  pcre2Regexp: String.raw`\bfunction\b[^\(]*\(\s*[^\)]*\bKEYWORD\b\s*,?\s*\)?`,
  emacsRegexp: String.raw`\bfunction\b[^\(]*\(\s*[^\)]*\bJJJ\b\s*,?\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function (test)",
    "function (test, blah)",
    "function somefunc(test, blah) {",
    "function(blah, test)",
  ],
  specFailed: [
    "function (testLen)",
    "function (test1, blah)",
    "function somefunc(testFirst, blah) {",
    "function(blah, testLast)",
    "function (Lentest)",
    "function (blahtest, blah)",
    "function somefunc(Firsttest, blah) {",
    "function(blah, Lasttest)",
  ],
});

addDefinition("javascript", {
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["function test()", "function test ()"],
  specFailed: [],
});

addDefinition("javascript", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*:\s*function\s*\(`,
  emacsRegexp: String.raw`\bJJJ\s*:\s*function\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test: function()"],
  specFailed: [],
});

addDefinition("javascript", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*=\s*function\s*\(`,
  emacsRegexp: String.raw`\bJJJ\s*=\s*function\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = function()"],
  specFailed: [],
});

addDefinition("hcl", {
  type: "block",
  pcre2Regexp: String.raw`(variable|output|module)\s*\"KEYWORD\"\s*\{`,
  emacsRegexp: String.raw`(variable|output|module)\s*\"JJJ\"\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ['variable "test" {', 'output "test" {', 'module "test" {'],
  specFailed: [],
});

addDefinition("hcl", {
  type: "block",
  pcre2Regexp: String.raw`(data|resource)\s*\"\w+\"\s*\"KEYWORD\"\s*\{`,
  emacsRegexp: String.raw`(data|resource)\s*\"\w+\"\s*\"JJJ\"\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    'data "openstack_images_image_v2" "test" {',
    'resource "google_compute_instance" "test" {',
  ],
  specFailed: [],
});

addDefinition("typescript", {
  type: "function",
  pcre2Regexp: String.raw`(service|factory)\(['\"]KEYWORD['\"]`,
  emacsRegexp: String.raw`(service|factory)\(['\"]JJJ['\"]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "module.factory('test', [\"$rootScope\", function($rootScope) {",
  ],
  specFailed: [],
});

addDefinition("typescript", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*[=:]\s*\([^\)]*\)\s+=>`,
  emacsRegexp: String.raw`\bJJJ\s*[=:]\s*\([^\)]*\)\s+=>`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "const test = (foo) => ",
    "test: (foo) => {",
    "  test: (foo) => {",
  ],
  specFailed: [],
});

addDefinition("typescript", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*\([^()]*\)\s*[{]`,
  emacsRegexp: String.raw`\bJJJ\s*\([^()]*\)\s*[{]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test(foo) {", "test (foo){", "test(foo){"],
  specFailed: ["test = blah.then(function(){"],
});

addDefinition("typescript", {
  type: "function",
  pcre2Regexp: String.raw`class\s*KEYWORD\s*[\(\{]`,
  emacsRegexp: String.raw`class\s*JJJ\s*[\(\{]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test{"],
  specFailed: [],
});

addDefinition("typescript", {
  type: "function",
  pcre2Regexp: String.raw`class\s*KEYWORD\s+extends`,
  emacsRegexp: String.raw`class\s*JJJ\s+extends`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test extends Component{"],
  specFailed: [],
});

addDefinition("typescript", {
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["function test()", "function test ()"],
  specFailed: [],
});

addDefinition("typescript", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*:\s*function\s*\(`,
  emacsRegexp: String.raw`\bJJJ\s*:\s*function\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test: function()"],
  specFailed: [],
});

addDefinition("typescript", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*=\s*function\s*\(`,
  emacsRegexp: String.raw`\bJJJ\s*=\s*function\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = function()"],
  specFailed: [],
});

addDefinition("typescript", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234", "const test = props =>"],
  specFailed: ["if (test === 1234)"],
});

addDefinition("typescript", {
  type: "variable",
  pcre2Regexp: String.raw`\bfunction\b[^\(]*\(\s*[^\)]*\bKEYWORD\b\s*,?\s*\)?`,
  emacsRegexp: String.raw`\bfunction\b[^\(]*\(\s*[^\)]*\bJJJ\b\s*,?\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function (test)",
    "function (test, blah)",
    "function somefunc(test, blah) {",
    "function(blah, test)",
  ],
  specFailed: [
    "function (testLen)",
    "function (test1, blah)",
    "function somefunc(testFirst, blah) {",
    "function(blah, testLast)",
    "function (Lentest)",
    "function (blahtest, blah)",
    "function somefunc(Firsttest, blah) {",
    "function(blah, Lasttest)",
  ],
});

addDefinition("julia", {
  type: "function",
  pcre2Regexp: String
    .raw`(@noinline|@inline)?\s*function\s*KEYWORD(\{[^\}]*\})?\(`,
  emacsRegexp: String.raw`(@noinline|@inline)?\s*function\s*JJJ(\{[^\}]*\})?\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function test()",
    "@inline function test()",
    "function test{T}(h)",
  ],
  specFailed: [],
});

addDefinition("julia", {
  type: "function",
  pcre2Regexp: String
    .raw`(@noinline|@inline)?KEYWORD(\{[^\}]*\})?\([^\)]*\)s*=`,
  emacsRegexp: String.raw`(@noinline|@inline)?JJJ(\{[^\}]*\})?\([^\)]*\)s*=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "test(a)=1",
    "test(a,b)=1*8",
    "@noinline test()=1",
    "test{T}(x)=x",
  ],
  specFailed: [],
});

addDefinition("julia", {
  type: "function",
  pcre2Regexp: String.raw`macro\s*KEYWORD\(`,
  emacsRegexp: String.raw`macro\s*JJJ\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["macro test(a)=1", " macro test(a,b)=1*8"],
  specFailed: [],
});

addDefinition("julia", {
  type: "variable",
  pcre2Regexp: String.raw`const\s+KEYWORD\b`,
  emacsRegexp: String.raw`const\s+JJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["const test = "],
  specFailed: [],
});

addDefinition("julia", {
  type: "type",
  pcre2Regexp: String.raw`(mutable)?\s*struct\s*KEYWORD`,
  emacsRegexp: String.raw`(mutable)?\s*struct\s*JJJ`,
  supports: ["ag", "rg"],
  specSuccess: ["struct test"],
  specFailed: [],
});

addDefinition("julia", {
  type: "type",
  pcre2Regexp: String.raw`(type|immutable|abstract)\s*KEYWORD`,
  emacsRegexp: String.raw`(type|immutable|abstract)\s*JJJ`,
  supports: ["ag", "rg"],
  specSuccess: ["type test", "immutable test", "abstract test <:Testable"],
  specFailed: [],
});

addDefinition("haskell", {
  type: "module",
  pcre2Regexp: String.raw`^module\s+KEYWORD\s+`,
  emacsRegexp: String.raw`^module\s+JJJ\s+`,
  supports: ["rg", "ag"],
  specSuccess: ["module test (exportA, exportB) where"],
  specFailed: [],
});

addDefinition("haskell", {
  type: "top level function",
  pcre2Regexp: String.raw`^\bKEYWORD(?!(\s+::))\s+((.|\s)*?)=\s+`,
  emacsRegexp: String.raw`^\bJJJ(?!(\s+::))\s+((.|\s)*?)=\s+`,
  supports: ["rg", "ag"],
  specSuccess: [
    "test n = n * 2",
    "test X{..} (Y a b c) \n bcd \n =\n x * y",
    "test ab cd e@Datatype {..} (Another thing, inTheRow) = \n undefined",
    "test = runRealBasedMode @ext @ctx identity identity",
    "test unwrap wrap nr@Naoeu {..} (Action action, specSpecs) = \n    undefined",
  ],
  specFailed: [
    "nottest n = n * 2",
    "let testnot x y = x * y",
    "test $ y z",
    "let test a o = mda",
    "test :: Sometype -> AnotherType aoeu kek = undefined",
  ],
});

addDefinition("haskell", {
  type: "type-like",
  pcre2Regexp: String
    .raw`^\s*((data(\s+family)?)|(newtype)|(type(\s+family)?))\s+KEYWORD\s+`,
  emacsRegexp: String
    .raw`^\s*((data(\s+family)?)|(newtype)|(type(\s+family)?))\s+JJJ\s+`,
  supports: ["rg", "ag"],
  specSuccess: [
    "newtype test a = Something { b :: Kek }",
    "data test a b = Somecase a | Othercase b",
    "type family test (x :: *) (xs :: [*]) :: Nat where",
    "data family test ",
    "type test = TestAlias",
  ],
  specFailed: [
    "newtype NotTest a = NotTest (Not a)",
    "data TestNot b = Aoeu",
  ],
});

addDefinition("haskell", {
  type: "(data)type constructor 1",
  pcre2Regexp: String
    .raw`(data|newtype)\s{1,3}(?!KEYWORD\s+)([^=]{1,40})=((\s{0,3}KEYWORD\s+)|([^=]{0,500}?((?<!(-- ))\|\s{0,3}KEYWORD\s+)))`,
  emacsRegexp: String
    .raw`(data|newtype)\s{1,3}(?!JJJ\s+)([^=]{1,40})=((\s{0,3}JJJ\s+)|([^=]{0,500}?((?<!(-- ))\|\s{0,3}JJJ\s+)))`,
  supports: ["rg", "ag"],
  specSuccess: [
    "data Something a = test { b :: Kek }",
    "data Mem a = TrueMem { b :: Kek } | test (Mem Int) deriving Mda",
    "newtype SafeTest a = test (Kek a) deriving (YonedaEmbedding)",
  ],
  specFailed: ["data Test = Test { b :: Kek }"],
});

addDefinition("haskell", {
  type: "data/newtype record field",
  pcre2Regexp: String
    .raw`(data|newtype)([^=]*)=[^=]*?({([^=}]*?)(\bKEYWORD)\s+::[^=}]+})`,
  emacsRegexp: String
    .raw`(data|newtype)([^=]*)=[^=]*?({([^=}]*?)(\bJJJ)\s+::[^=}]+})`,
  supports: ["rg", "ag"],
  specSuccess: [
    "data Mem = Mem { \n mda :: A \n  , test :: Kek \n , \n aoeu :: E \n }",
    "data Mem = Mem { \n test :: A \n  , mda :: Kek \n , \n aoeu :: E \n }",
    "data Mem = Mem { \n mda :: A \n  , aoeu :: Kek \n , \n test :: E \n }",
    "data Mem = Mem { test :: Kek } deriving Mda",
    "data Mem = Mem { \n test :: Kek \n } deriving Mda",
    "newtype Mem = Mem { \n test :: Kek \n } deriving (Eq)",
    "newtype Mem = Mem { -- | Some docs \n test :: Kek -- ^ More docs } deriving Eq",
    "newtype Mem = Mem { test :: Kek } deriving (Eq,Monad)",
    "newtype NewMem = OldMem { test :: [Tx] }",
    "newtype BlockHeaderList ssc = BHL\n { test :: ([Aoeu a], [Ssss])\n    } deriving (Eq)",
  ],
  specFailed: ["data Heh = Mda { sometest :: Kek, testsome :: Mem }"],
});

addDefinition("haskell", {
  type: "typeclass",
  pcre2Regexp: String.raw`^class\s+(.+=>\s*)?KEYWORD\s+`,
  emacsRegexp: String.raw`^class\s+(.+=>\s*)?JJJ\s+`,
  supports: ["rg", "ag"],
  specSuccess: [
    "class (Constr1 m, Constr 2) => test (Kek a) where",
    "class  test  (Veryovka a)  where ",
  ],
  specFailed: [
    "class test2 (Kek a) where",
    "class MakeTest (AoeuTest x y z) where",
  ],
});

addDefinition("ocaml", {
  type: "type",
  pcre2Regexp: String.raw`^\s*(and|type)\s+.*\bKEYWORD\b`,
  emacsRegexp: String.raw`^\s*(and|type)\s+.*\bJJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: [
    "type test =",
    "and test =",
    "type 'a test =",
    "type ('a, _, 'c) test",
  ],
  specFailed: [],
});

addDefinition("ocaml", {
  type: "variable",
  pcre2Regexp: String.raw`let\s+KEYWORD\b`,
  emacsRegexp: String.raw`let\s+JJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["let test =", "let test x y ="],
  specFailed: [],
});

addDefinition("ocaml", {
  type: "variable",
  pcre2Regexp: String.raw`let\s+rec\s+KEYWORD\b`,
  emacsRegexp: String.raw`let\s+rec\s+JJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["let rec test =", "let rec  test x y ="],
  specFailed: [],
});

addDefinition("ocaml", {
  type: "variable",
  pcre2Regexp: String.raw`\s*val\s*\bKEYWORD\b\s*`,
  emacsRegexp: String.raw`\s*val\s*\bJJJ\b\s*`,
  supports: ["ag", "rg"],
  specSuccess: ["val test"],
  specFailed: [],
});

addDefinition("ocaml", {
  type: "module",
  pcre2Regexp: String.raw`^\s*module\s*\bKEYWORD\b`,
  emacsRegexp: String.raw`^\s*module\s*\bJJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["module test ="],
  specFailed: [],
});

addDefinition("ocaml", {
  type: "module",
  pcre2Regexp: String.raw`^\s*module\s*type\s*\bKEYWORD\b`,
  emacsRegexp: String.raw`^\s*module\s*type\s*\bJJJ\b`,
  supports: ["ag", "rg"],
  specSuccess: ["module type test ="],
  specFailed: [],
});

addDefinition("lua", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test === 1234"],
});

addDefinition("lua", {
  type: "variable",
  pcre2Regexp: String.raw`\bfunction\b[^\(]*\(\s*[^\)]*\bKEYWORD\b\s*,?\s*\)?`,
  emacsRegexp: String.raw`\bfunction\b[^\(]*\(\s*[^\)]*\bJJJ\b\s*,?\s*\)?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function (test)",
    "function (test, blah)",
    "function somefunc(test, blah)",
    "function(blah, test)",
  ],
  specFailed: [
    "function (testLen)",
    "function (test1, blah)",
    "function somefunc(testFirst, blah)",
    "function(blah, testLast)",
    "function (Lentest)",
    "function (blahtest, blah)",
    "function somefunc(Firsttest, blah)",
    "function(blah, Lasttest)",
  ],
});

addDefinition("lua", {
  type: "function",
  pcre2Regexp: String.raw`function\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["function test()", "function test ()"],
  specFailed: [],
});

addDefinition("lua", {
  type: "function",
  pcre2Regexp: String.raw`function\s*.+[.:]KEYWORD\s*\(`,
  emacsRegexp: String.raw`function\s*.+[.:]JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function MyClass.test()",
    "function MyClass.test ()",
    "function MyClass:test()",
    "function MyClass:test ()",
  ],
  specFailed: [],
});

addDefinition("lua", {
  type: "function",
  pcre2Regexp: String.raw`\bKEYWORD\s*=\s*function\s*\(`,
  emacsRegexp: String.raw`\bJJJ\s*=\s*function\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = function()"],
  specFailed: [],
});

addDefinition("lua", {
  type: "function",
  pcre2Regexp: String.raw`\b.+\.KEYWORD\s*=\s*function\s*\(`,
  emacsRegexp: String.raw`\b.+\.JJJ\s*=\s*function\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["MyClass.test = function()"],
  specFailed: [],
});

addDefinition("rust", {
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

addDefinition("rust", {
  type: "variable",
  pcre2Regexp: String.raw`\bconst\s+KEYWORD:\s*[^=\n]+\s*=[^=\n]+`,
  emacsRegexp: String.raw`\bconst\s+JJJ:\s*[^=\n]+\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["const test: u32 = 1234;"],
  specFailed: [],
});

addDefinition("rust", {
  type: "variable",
  pcre2Regexp: String.raw`\bstatic\s+(mut\s+)?KEYWORD:\s*[^=\n]+\s*=[^=\n]+`,
  emacsRegexp: String.raw`\bstatic\s+(mut\s+)?JJJ:\s*[^=\n]+\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["static test: u32 = 1234;", "static mut test: u32 = 1234;"],
  specFailed: [],
});

addDefinition("rust", {
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

addDefinition("rust", {
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

addDefinition("rust", {
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

addDefinition("rust", {
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

addDefinition("rust", {
  type: "function",
  pcre2Regexp: String.raw`\bfn\s+KEYWORD\s*\(`,
  emacsRegexp: String.raw`\bfn\s+JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["fn test(asdf: u32)", "fn test()", "pub fn test()"],
  specFailed: [],
});

addDefinition("rust", {
  type: "function",
  pcre2Regexp: String.raw`\bmacro_rules!\s+KEYWORD`,
  emacsRegexp: String.raw`\bmacro_rules!\s+JJJ`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["macro_rules! test"],
  specFailed: [],
});

addDefinition("rust", {
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

addDefinition("rust", {
  type: "type",
  pcre2Regexp: String.raw`trait\s+KEYWORD\s*[{]?`,
  emacsRegexp: String.raw`trait\s+JJJ\s*[{]?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["trait test;", "trait test { fn abc() -> u32; }"],
  specFailed: [],
});

addDefinition("rust", {
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

addDefinition("rust", {
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

addDefinition("rust", {
  type: "type",
  pcre2Regexp: String.raw`mod\s+KEYWORD\s*[{]?`,
  emacsRegexp: String.raw`mod\s+JJJ\s*[{]?`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["mod test;", "pub mod test {"],
  specFailed: [],
});

addDefinition("elixir", {
  type: "function",
  pcre2Regexp: String.raw`\bdef(p)?\s+KEYWORD\s*[ ,\(]`,
  emacsRegexp: String.raw`\bdef(p)?\s+JJJ\s*[ ,\(]`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "def test do",
    "def test, do:",
    "def test() do",
    "def test(), do:",
    "def test(foo, bar) do",
    "def test(foo, bar), do:",
    "defp test do",
    "defp test(), do:",
  ],
  specFailed: [],
});

addDefinition("elixir", {
  type: "variable",
  pcre2Regexp: String.raw`\s*KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\s*JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test == 1234"],
});

addDefinition("elixir", {
  type: "module",
  pcre2Regexp: String.raw`defmodule\s+(\w+\.)*KEYWORD\s+`,
  emacsRegexp: String.raw`defmodule\s+(\w+\.)*JJJ\s+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["defmodule test do", "defmodule Foo.Bar.test do"],
  specFailed: [],
});

addDefinition("elixir", {
  type: "module",
  pcre2Regexp: String.raw`defprotocol\s+(\w+\.)*KEYWORD\s+`,
  emacsRegexp: String.raw`defprotocol\s+(\w+\.)*JJJ\s+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["defprotocol test do", "defprotocol Foo.Bar.test do"],
  specFailed: [],
});

addDefinition("erlang", {
  type: "function",
  pcre2Regexp: String.raw`^KEYWORD\b\s*\(`,
  emacsRegexp: String.raw`^JJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "test() ->",
    "test()->",
    "test(Foo) ->",
    "test (Foo,Bar) ->",
    "test(Foo, Bar)->",
  ],
  specFailed: [],
});

addDefinition("erlang", {
  type: "variable",
  pcre2Regexp: String.raw`\s*KEYWORD\s*=[^:=\n]+`,
  emacsRegexp: String.raw`\s*JJJ\s*=[^:=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test = 1234"],
  specFailed: ["if test =:= 1234", "if test == 1234"],
});

addDefinition("erlang", {
  type: "module",
  pcre2Regexp: String.raw`^-module\(KEYWORD\)`,
  emacsRegexp: String.raw`^-module\(JJJ\)`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["-module(test)."],
  specFailed: [],
});

addDefinition("scss", {
  type: "function",
  pcre2Regexp: String.raw`@mixin\sKEYWORD\b\s*\(`,
  emacsRegexp: String.raw`@mixin\sJJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["@mixin test()"],
  specFailed: [],
});

addDefinition("scss", {
  type: "function",
  pcre2Regexp: String.raw`@function\sKEYWORD\b\s*\(`,
  emacsRegexp: String.raw`@function\sJJJ\b\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["@function test()"],
  specFailed: [],
});

addDefinition("scss", {
  type: "variable",
  pcre2Regexp: String.raw`KEYWORD\s*:\s*`,
  emacsRegexp: String.raw`JJJ\s*:\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["test  :"],
  specFailed: [],
});

addDefinition("sml", {
  type: "type",
  pcre2Regexp: String.raw`\s*(data)?type\s+.*\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*(data)?type\s+.*\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "datatype test =",
    "datatype test=",
    "datatype 'a test =",
    "type test =",
    "type 'a test =",
    "type 'a test",
    "type test",
  ],
  specFailed: ["datatypetest ="],
});

addDefinition("sml", {
  type: "variable",
  pcre2Regexp: String.raw`\s*val\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*val\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["val test =", "val test=", "val test : bool"],
  specFailed: [],
});

addDefinition("sml", {
  type: "function",
  pcre2Regexp: String.raw`\s*fun\s+\bKEYWORD\b.*\s*=`,
  emacsRegexp: String.raw`\s*fun\s+\bJJJ\b.*\s*=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "fun test list =",
    "fun test (STRING_NIL, a) =",
    "fun test ((s1,s2): 'a queue) : 'a * 'a queue =",
    "fun test (var : q) : int =",
    "fun test f e xs =",
  ],
  specFailed: [],
});

addDefinition("sml", {
  type: "module",
  pcre2Regexp: String.raw`\s*(structure|signature|functor)\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*(structure|signature|functor)\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "structure test =",
    "structure test : MYTEST =",
    "signature test =",
    "functor test (T:TEST) =",
    "functor test(T:TEST) =",
  ],
  specFailed: [],
});

addDefinition("sql", {
  type: "function",
  pcre2Regexp: String
    .raw`(CREATE|create)\s+(.+?\s+)?(FUNCTION|function|PROCEDURE|procedure)\s+KEYWORD\s*\(`,
  emacsRegexp: String
    .raw`(CREATE|create)\s+(.+?\s+)?(FUNCTION|function|PROCEDURE|procedure)\s+JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "CREATE FUNCTION test(i INT) RETURNS INT",
    "create or replace function test (int)",
    "CREATE PROCEDURE test (OUT p INT)",
    "create definer = 'test'@'localhost' procedure test()",
  ],
  specFailed: [],
});

addDefinition("sql", {
  type: "table",
  pcre2Regexp: String
    .raw`(CREATE|create)\s+(.+?\s+)?(TABLE|table)(\s+(IF NOT EXISTS|if not exists))?\s+KEYWORD\b`,
  emacsRegexp: String
    .raw`(CREATE|create)\s+(.+?\s+)?(TABLE|table)(\s+(IF NOT EXISTS|if not exists))?\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "CREATE TABLE test (",
    "create temporary table if not exists test",
    "CREATE TABLE IF NOT EXISTS test (",
    "create global temporary table test",
  ],
  specFailed: [],
});

addDefinition("sql", {
  type: "view",
  pcre2Regexp: String.raw`(CREATE|create)\s+(.+?\s+)?(VIEW|view)\s+KEYWORD\b`,
  emacsRegexp: String.raw`(CREATE|create)\s+(.+?\s+)?(VIEW|view)\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "CREATE VIEW test (",
    "create sql security definer view test",
    "CREATE OR REPLACE VIEW test AS foo",
  ],
  specFailed: [],
});

addDefinition("sql", {
  type: "type",
  pcre2Regexp: String.raw`(CREATE|create)\s+(.+?\s+)?(TYPE|type)\s+KEYWORD\b`,
  emacsRegexp: String.raw`(CREATE|create)\s+(.+?\s+)?(TYPE|type)\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "CREATE TYPE test",
    "CREATE OR REPLACE TYPE test AS foo (",
    "create type test as (",
  ],
  specFailed: [],
});

addDefinition("systemverilog", {
  type: "type",
  pcre2Regexp: String.raw`\s*class\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*class\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "virtual class test;",
    "class test;",
    "class test extends some_class",
  ],
  specFailed: [
    "virtual class testing;",
    "class test2;",
    "class some_test",
    "class some_class extends test",
  ],
});

addDefinition("systemverilog", {
  type: "type",
  pcre2Regexp: String.raw`\s*task\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*task\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["task test (", "task test("],
  specFailed: ["task testing (", "task test2("],
});

addDefinition("systemverilog", {
  type: "type",
  pcre2Regexp: String.raw`\s*\bKEYWORD\b\s*=`,
  emacsRegexp: String.raw`\s*\bJJJ\b\s*=`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["assign test =", "assign test=", "int test =", "int test="],
  specFailed: ["assign testing =", "assign test2="],
});

addDefinition("systemverilog", {
  type: "function",
  pcre2Regexp: String.raw`function\s[^\s]+\s*\bKEYWORD\b`,
  emacsRegexp: String.raw`function\s[^\s]+\s*\bJJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: ["function Matrix test ;", "function Matrix test;"],
  specFailed: ["function test blah"],
});

addDefinition("systemverilog", {
  type: "function",
  pcre2Regexp: String.raw`^\s*[^\s]*\s*[^\s]+\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`^\s*[^\s]*\s*[^\s]+\s+\bJJJ\b`,
  supports: ["ag", "rg", "git-grep"],
  specSuccess: [
    "some_class_name test",
    "  another_class_name  test ;",
    "some_class test[];",
    "some_class #(1) test",
  ],
  specFailed: ["test some_class_name", "class some_class extends test"],
});

addDefinition("vhdl", {
  type: "type",
  pcre2Regexp: String.raw`\s*type\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*type\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["type test is", "type test  is"],
  specFailed: ["type testing is", "type test2  is"],
});

addDefinition("vhdl", {
  type: "type",
  pcre2Regexp: String.raw`\s*constant\s+\bKEYWORD\b`,
  emacsRegexp: String.raw`\s*constant\s+\bJJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["constant test :", "constant test:"],
  specFailed: ["constant testing ", "constant test2:"],
});

addDefinition("vhdl", {
  type: "function",
  pcre2Regexp: String.raw`function\s*\"?KEYWORD\"?\s*\(`,
  emacsRegexp: String.raw`function\s*\"?JJJ\"?\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "function test(signal)",
    "function test (signal)",
    'function "test" (signal)',
  ],
  specFailed: ["function testing(signal"],
});

addDefinition("tex", {
  type: "command",
  pcre2Regexp: String.raw`\\\\.*newcommand\*?\s*\{\s*(\\\\)KEYWORD\s*}`,
  emacsRegexp: String.raw`\\\\.*newcommand\*?\s*\{\s*(\\\\)JJJ\s*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    String.raw`\\newcommand{\\test}`,
    String.raw`\\renewcommand{\\test}`,
    String.raw`\\renewcommand*{\\test}`,
    String.raw`\\newcommand*{\\test}`,
    String.raw`\\renewcommand{ \\test }`,
  ],
  specFailed: [String.raw`\\test`, "test"],
});

addDefinition("tex", {
  type: "command",
  pcre2Regexp: String
    .raw`\\\\.*newcommand\*?\s*(\\\\)KEYWORD($|[^a-zA-Z0-9\?\*-])`,
  emacsRegexp: String.raw`\\\\.*newcommand\*?\s*(\\\\)JJJ\j`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    String.raw`\\newcommand\\test {}`,
    String.raw`\\renewcommand\\test{}`,
    String.raw`\\newcommand \\test`,
  ],
  specFailed: [String.raw`\\test`, "test"],
});

addDefinition("tex", {
  type: "length",
  pcre2Regexp: String.raw`\\\\(s)etlength\s*\{\s*(\\\\)KEYWORD\s*}`,
  emacsRegexp: String.raw`\\\\(s)etlength\s*\{\s*(\\\\)JJJ\s*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    String.raw`\\setlength { \\test}`,
    String.raw`\\setlength{\\test}`,
    String.raw`\\setlength{\\test}{morecommands}`,
  ],
  specFailed: [String.raw`\\test`, "test"],
});

addDefinition("tex", {
  type: "counter",
  pcre2Regexp: String.raw`\\\\newcounter\{\s*KEYWORD\s*}`,
  emacsRegexp: String.raw`\\\\newcounter\{\s*JJJ\s*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [String.raw`\\newcounter{test}`],
  specFailed: [String.raw`\\test`, "test"],
});

addDefinition("tex", {
  type: "environment",
  pcre2Regexp: String.raw`\\\\.*newenvironment\s*\{\s*KEYWORD\s*}`,
  emacsRegexp: String.raw`\\\\.*newenvironment\s*\{\s*JJJ\s*}`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    String.raw`\\newenvironment{test}`,
    String.raw`\\newenvironment {test}{morecommands}`,
    String.raw`\\lstnewenvironment{test}`,
    String.raw`\\newenvironment {test}`,
  ],
  specFailed: [String.raw`\\test`, "test"],
});

addDefinition("pascal", {
  type: "function",
  pcre2Regexp: String.raw`\bfunction\s+KEYWORD\b`,
  emacsRegexp: String.raw`\bfunction\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["  function test : "],
  specFailed: [],
});

addDefinition("pascal", {
  type: "function",
  pcre2Regexp: String.raw`\bprocedure\s+KEYWORD\b`,
  emacsRegexp: String.raw`\bprocedure\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["  procedure test ; "],
  specFailed: [],
});

addDefinition("fsharp", {
  type: "variable",
  pcre2Regexp: String.raw`let\s+KEYWORD\b.*\=`,
  emacsRegexp: String.raw`let\s+JJJ\b.*\=`,
  supports: ["ag", "grep", "git-grep"],
  specSuccess: [
    "let test = 1234",
    "let test() = 1234",
    "let test abc def = 1234",
  ],
  specFailed: [
    "let testnot = 1234",
    "let testnot() = 1234",
    "let testnot abc def = 1234",
  ],
});

addDefinition("fsharp", {
  type: "interface",
  pcre2Regexp: String.raw`member(\b.+\.|\s+)KEYWORD\b.*\=`,
  emacsRegexp: String.raw`member(\b.+\.|\s+)JJJ\b.*\=`,
  supports: ["ag", "grep", "git-grep"],
  specSuccess: ["member test = 1234", "member this.test = 1234"],
  specFailed: ["member testnot = 1234", "member this.testnot = 1234"],
});

addDefinition("fsharp", {
  type: "type",
  pcre2Regexp: String.raw`type\s+KEYWORD\b.*\=`,
  emacsRegexp: String.raw`type\s+JJJ\b.*\=`,
  supports: ["ag", "grep", "git-grep"],
  specSuccess: ["type test = 1234"],
  specFailed: ["type testnot = 1234"],
});

addDefinition("kotlin", {
  type: "function",
  pcre2Regexp: String.raw`fun\s*(<[^>]*>)?\s*KEYWORD\s*\(`,
  emacsRegexp: String.raw`fun\s*(<[^>]*>)?\s*JJJ\s*\(`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["fun test()", "fun <T> test()"],
  specFailed: [],
});

addDefinition("kotlin", {
  type: "variable",
  pcre2Regexp: String.raw`(val|var)\s*KEYWORD\b`,
  emacsRegexp: String.raw`(val|var)\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["val test ", "var test"],
  specFailed: ["val testval", "var testvar"],
});

addDefinition("kotlin", {
  type: "type",
  pcre2Regexp: String.raw`(class|interface)\s*KEYWORD\b`,
  emacsRegexp: String.raw`(class|interface)\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test", "class test : SomeInterface", "interface test"],
  specFailed: [],
});

addDefinition("zig", {
  type: "function",
  pcre2Regexp: String.raw`fn\s+KEYWORD\b`,
  emacsRegexp: String.raw`fn\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "fn test() void {",
    "fn test(a: i32) i32 {",
    "pub fn test(a: i32) i32 {",
    "export fn test(a: i32) i32 {",
    'extern "c" fn test(a: i32) i32 {',
    "inline fn test(a: i32) i32 {",
  ],
  specFailed: [],
});

addDefinition("zig", {
  type: "variable",
  pcre2Regexp: String.raw`(var|const)\s+KEYWORD\b`,
  emacsRegexp: String.raw`(var|const)\s+JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: [
    "const test: i32 = 3;",
    "var test: i32 = 3;",
    "pub const test: i32 = 3;",
  ],
  specFailed: [],
});

addDefinition("protobuf", {
  type: "message",
  pcre2Regexp: String.raw`message\s+KEYWORD\s*\{`,
  emacsRegexp: String.raw`message\s+JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["message test{", "message test {"],
  specFailed: [],
});

addDefinition("protobuf", {
  type: "enum",
  pcre2Regexp: String.raw`enum\s+KEYWORD\s*\{`,
  emacsRegexp: String.raw`enum\s+JJJ\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["enum test{", "enum test {"],
  specFailed: [],
});

addDefinition("apex", {
  type: "function",
  pcre2Regexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}KEYWORD\s*\(`,
  emacsRegexp: String.raw`^\s*(?:[\w\[\]]+\s+){1,3}JJJ\s*\(`,
  supports: ["ag", "rg"],
  specSuccess: [
    "int test()",
    "int test(param)",
    "static int test()",
    "static int test(param)",
    "public static MyType test()",
    "private virtual SomeType test(param)",
    "static int test()",
    "private foo[] test()",
  ],
  specFailed: [
    "test()",
    "testnot()",
    "blah = new test()",
    "foo bar = test()",
  ],
});

addDefinition("apex", {
  type: "variable",
  pcre2Regexp: String.raw`\s*\bKEYWORD\s*=[^=\n)]+`,
  emacsRegexp: String.raw`\s*\bJJJ\s*=[^=\n)]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["int test = 1234"],
  specFailed: ["if test == 1234:", "int nottest = 44"],
});

addDefinition("apex", {
  type: "type",
  pcre2Regexp: String.raw`(class|interface)\s*KEYWORD\b`,
  emacsRegexp: String.raw`(class|interface)\s*JJJ\b`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["class test:", "public class test implements Something"],
  specFailed: ["class testnot:", "public class testnot implements Something"],
});
