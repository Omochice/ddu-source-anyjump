/**
 * Decode Uint8Array as string
 *
 * @param raw target string
 * @return decoded one
 */
export const decode = (() => {
  const decoder = new TextDecoder();
  return (raw: Uint8Array): string => decoder.decode(raw);
})();
