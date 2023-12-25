export type Definition = {
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
