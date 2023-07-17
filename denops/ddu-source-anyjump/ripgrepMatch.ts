import {
  $array,
  $const,
  $number,
  $object,
  $string,
  type Infer,
} from "https://esm.sh/lizod@0.2.6";

/**
 * Validate is input ripgrep match object
 *
 * @param input validation target
 * @return Wheather is input matched
 */
export const validate = $object({
  type: $const("match"),
  data: $object({
    path: $object({ text: $string }),
    lines: $object({ text: $string }),
    line_number: $number,
    absolute_offset: $number,
    submatches: $array(
      $object({
        match: $object({ text: $string }),
        start: $number,
        end: $number,
      }),
    ),
  }),
});

export type Match = Infer<typeof validate>;
