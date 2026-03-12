{
  description = "anyjump source for ddu.vim";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    nur-packages = {
      url = "github:Omochice/nur-packages";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      treefmt-nix,
      flake-utils,
      nur-packages,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            nur-packages.overlays.default
          ];
        };
        treefmt = treefmt-nix.lib.evalModule pkgs (
          { ... }:
          let
            rumdlConfig = (pkgs.formats.toml { }).generate "rumdl.toml" {
              # keep-sorted start
              MD004.style = "dash";
              MD007.indent = 4;
              MD007.style = "fixed";
              MD041.enabled = false;
              MD049.style = "underscore";
              MD050.style = "asterisk";
              MD055.style = "leading-and-trailing";
              MD060.enabled = true;
              MD060.style = "aligned";
              global.length = 0;
              # keep-sorted end
            };
            typosConfig = (pkgs.formats.toml { }).generate "typos.toml" {
              # keep-sorted start
              default.extend-words.noet = "noet";
              # keep-sorted end
            };
          in
          {
            settings.global.excludes = [
              "CHANGELOG.md"
            ];
            settings.formatter = {
              # keep-sorted start block=yes
              rumdl = {
                command = "${pkgs.lib.getExe pkgs.rumdl}";
                options = [
                  "fmt"
                  "--config"
                  (toString rumdlConfig)
                ];
                includes = [ "*.md" ];
              };
              # keep-sorted end
            };
            programs = {
              # keep-sorted start block=yes
              deno.enable = true;
              formatjson5.enable = true;
              keep-sorted.enable = true;
              nixfmt.enable = true;
              typos = {
                enable = true;
                configFile = toString typosConfig;
              };
              yamlfmt = {
                enable = true;
                settings = {
                  formatter = {
                    type = "basic";
                    retain_line_breaks_single = true;
                  };
                };
              };
              # keep-sorted end
            };
          }
        );
        runAs =
          name: runtimeInputs: text:
          let
            program = pkgs.writeShellApplication {
              inherit name runtimeInputs text;
            };
          in
          {
            type = "app";
            program = "${program}/bin/${name}";
          };
        devPackages = rec {
          # keep-sorted start block=yes
          actions = with pkgs; [
            actionlint
            ghalint
            zizmor
          ];
          deno = [ pkgs.deno ];
          renovate = [ pkgs.renovate ];
          # keep-sorted end
          default = [
            treefmt.config.build.wrapper
          ]
          ++ actions
          ++ deno
          ++ renovate;
        };
      in
      {
        # keep-sorted start block=yes
        apps = {
          check-action = pkgs.lib.pipe ''
            actionlint
            ghalint run
            zizmor .github
          '' [ (runAs "check-action" devPackages.actions) ];
          check-renovate-config = pkgs.lib.pipe ''
            renovate-config-validator renovate.json5
          '' [ (runAs "check-renovate-config" devPackages.renovate) ];
          check-deno = pkgs.lib.pipe ''
            deno task fmt:check
            deno task check
            deno task lint
          '' [ (runAs "check-deno" devPackages.deno) ];
        };
        checks = {
          formatting = treefmt.config.build.check self;
        };
        devShells = pkgs.lib.pipe devPackages [
          (pkgs.lib.attrsets.mapAttrs (name: buildInputs: pkgs.mkShell { inherit buildInputs; }))
        ];
        formatter = treefmt.config.build.wrapper;
        # keep-sorted end
      }
    );
}
