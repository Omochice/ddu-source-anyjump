import { Definition } from "./type.ts";
import { definitions as apex } from "./languages/apex.ts";
import { definitions as clojure } from "./languages/clojure.ts";
import { definitions as coffeescript } from "./languages/coffeescript.ts";
import { definitions as commonlisp } from "./languages/commonlisp.ts";
import { definitions as coq } from "./languages/coq.ts";
import { definitions as cpp } from "./languages/cpp.ts";
import { definitions as crystal } from "./languages/crystal.ts";
import { definitions as csharp } from "./languages/csharp.ts";
import { definitions as dart } from "./languages/dart.ts";
import { definitions as elisp } from "./languages/elisp.ts";
import { definitions as elixir } from "./languages/elixir.ts";
import { definitions as erlang } from "./languages/erlang.ts";
import { definitions as faust } from "./languages/faust.ts";
import { definitions as fennel } from "./languages/fennel.ts";
import { definitions as fortran } from "./languages/fortran.ts";
import { definitions as fsharp } from "./languages/fsharp.ts";
import { definitions as go } from "./languages/go.ts";
import { definitions as groovy } from "./languages/groovy.ts";
import { definitions as haskell } from "./languages/haskell.ts";
import { definitions as hcl } from "./languages/hcl.ts";
import { definitions as java } from "./languages/java.ts";
import { definitions as javascript } from "./languages/javascript.ts";
import { definitions as julia } from "./languages/julia.ts";
import { definitions as kotlin } from "./languages/kotlin.ts";
import { definitions as lua } from "./languages/lua.ts";
import { definitions as matlab } from "./languages/matlab.ts";
import { definitions as nim } from "./languages/nim.ts";
import { definitions as nix } from "./languages/nix.ts";
import { definitions as objc } from "./languages/objc.ts";
import { definitions as ocaml } from "./languages/ocaml.ts";
import { definitions as pascal } from "./languages/pascal.ts";
import { definitions as perl } from "./languages/perl.ts";
import { definitions as php } from "./languages/php.ts";
import { definitions as protobuf } from "./languages/protobuf.ts";
import { definitions as python } from "./languages/python.ts";
import { definitions as r } from "./languages/r.ts";
import { definitions as racket } from "./languages/racket.ts";
import { definitions as ruby } from "./languages/ruby.ts";
import { definitions as rust } from "./languages/rust.ts";
import { definitions as scad } from "./languages/scad.ts";
import { definitions as scala } from "./languages/scala.ts";
import { definitions as scheme } from "./languages/scheme.ts";
import { definitions as scss } from "./languages/scss.ts";
import { definitions as shell } from "./languages/shell.ts";
import { definitions as sml } from "./languages/sml.ts";
import { definitions as solidity } from "./languages/solidity.ts";
import { definitions as sql } from "./languages/sql.ts";
import { definitions as swift } from "./languages/swift.ts";
import { definitions as systemverilog } from "./languages/systemverilog.ts";
import { definitions as tcl } from "./languages/tcl.ts";
import { definitions as tex } from "./languages/tex.ts";
import { definitions as typescript } from "./languages/typescript.ts";
import { definitions as vala } from "./languages/vala.ts";
import { definitions as vhdl } from "./languages/vhdl.ts";
import { definitions as zig } from "./languages/zig.ts";

export const definitions = new Map<string, Definition[]>(
  [
    ["apex", apex],
    ["clojure", clojure],
    ["coffeescript", coffeescript],
    ["commonlisp", commonlisp],
    ["coq", coq],
    ["cpp", cpp],
    ["crystal", crystal],
    ["csharp", csharp],
    ["dart", dart],
    ["elisp", elisp],
    ["elixir", elixir],
    ["erlang", erlang],
    ["faust", faust],
    ["fennel", fennel],
    ["fortran", fortran],
    ["fsharp", fsharp],
    ["go", go],
    ["groovy", groovy],
    ["haskell", haskell],
    ["hcl", hcl],
    ["java", java],
    ["javascript", javascript],
    ["julia", julia],
    ["kotlin", kotlin],
    ["lua", lua],
    ["matlab", matlab],
    ["nim", nim],
    ["nix", nix],
    ["objc", objc],
    ["ocaml", ocaml],
    ["pascal", pascal],
    ["perl", perl],
    ["php", php],
    ["protobuf", protobuf],
    ["python", python],
    ["r", r],
    ["racket", racket],
    ["ruby", ruby],
    ["rust", rust],
    ["scad", scad],
    ["scala", scala],
    ["scheme", scheme],
    ["scss", scss],
    ["shell", shell],
    ["sml", sml],
    ["solidity", solidity],
    ["sql", sql],
    ["swift", swift],
    ["systemverilog", systemverilog],
    ["tcl", tcl],
    ["tex", tex],
    ["typescript", typescript],
    ["vala", vala],
    ["vhdl", vhdl],
    ["zig", zig],
  ],
);
