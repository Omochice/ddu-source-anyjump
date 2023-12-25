import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
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

definitions.push({
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

definitions.push({
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

definitions.push({
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
