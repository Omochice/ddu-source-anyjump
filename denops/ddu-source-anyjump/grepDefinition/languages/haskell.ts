import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "module",
  pcre2Regexp: String.raw`^module\s+KEYWORD\s+`,
  emacsRegexp: String.raw`^module\s+JJJ\s+`,
  supports: ["rg", "ag"],
  specSuccess: ["module test (exportA, exportB) where"],
  specFailed: [],
});

definitions.push({
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

definitions.push({
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

definitions.push({
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

definitions.push({
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

definitions.push({
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
