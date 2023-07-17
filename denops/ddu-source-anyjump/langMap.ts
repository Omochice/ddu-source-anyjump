const langMap = new Map([
  ["python", "py"],
  ["javascript", "js"],
  ["typescript", "ts"],
  ["commonlisp", "lisp"],
  ["scss", "css"],
]);

/**
 * Convert language name
 *
 * @param language langage name
 * @return converted
 */
export function convertLanguageName(language: string): string {
  return langMap.get(language) ?? language;
}
