import { Definition } from "../type.ts";

export const definitions: Definition[] = [];

definitions.push({
  type: "block",
  pcre2Regexp: String.raw`(variable|output|module)\s*\"KEYWORD\"\s*\{`,
  emacsRegexp: String.raw`(variable|output|module)\s*\"JJJ\"\s*\{`,
  supports: ["ag", "grep", "rg", "git-grep"],
  specSuccess: ['variable "test" {', 'output "test" {', 'module "test" {'],
  specFailed: [],
});

definitions.push({
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
