import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "function",
  pcre2Regexp: String.raw`\)\s*KEYWORD(:|\b|\s)`,
  emacsRegexp: String.raw`\)\s*JJJ(:|\b|\s)`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["- (void)test", "- (void)test:(UIAlertView *)alertView"],
  specFailed: ["- (void)testnot", "- (void)testnot:(UIAlertView *)alertView"],
});

definitions.push({
  type: "variable",
  pcre2Regexp: String.raw`\b\*?KEYWORD\s*=[^=\n]+`,
  emacsRegexp: String.raw`\b\*?JJJ\s*=[^=\n]+`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ['NSString *test = @"asdf"'],
  specFailed: ['NSString *testnot = @"asdf"', 'NSString *nottest = @"asdf"'],
});

definitions.push({
  type: "type",
  pcre2Regexp: String
    .raw`(@interface|@protocol|@implementation)\b\s*KEYWORD\b\s*`,
  emacsRegexp: String.raw`(@interface|@protocol|@implementation)\b\s*JJJ\b\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["@interface test: UIWindow"],
  specFailed: ["@interface testnon: UIWindow"],
});

definitions.push({
  type: "type",
  pcre2Regexp: String
    .raw`typedef\b\s+(NS_OPTIONS|NS_ENUM)\b\([^,]+?,\s*KEYWORD\b\s*`,
  emacsRegexp: String
    .raw`typedef\b\s+(NS_OPTIONS|NS_ENUM)\b\([^,]+?,\s*JJJ\b\s*`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ["typedef NS_ENUM(NSUInteger, test)"],
  specFailed: ["typedef NS_ENUMD(NSUInteger, test)"],
});
