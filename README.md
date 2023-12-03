# ddu-source-anyjump 

Source for non-LSP oriented definition|reference list.

Based on https://github.com/pechorin/any-jump.vim.

## Contents 

- [ddu-source-anyjump-installation](ddu-source-anyjump-installation)
- [ddu-source-anyjump-dependencies](ddu-source-anyjump-dependencies)
- [ddu-source-anyjump-examples](ddu-source-anyjump-examples)
- [ddu-source-anyjump-params](ddu-source-anyjump-params)

## Installation 

Use your favorite plugin manager or other.

## Dependencies 

ddu.vim and denops.vim are required.

- https://github.com/Shougo/ddu.vim
- https://github.com/vim-denops/denops.vim
- https://github.com/BurntSushi/ripgrep
- https://github.com/Shougo/ddu-kind-file

Need to set `rg` in your PATH.

## Examples 

Configuration:

```vim
call ddu#custom#patch_global(#{
    \   sourceParams: #{
    \     anyjump_definition: #{
    \       highlights: #{
    \         path: 'Normal',
    \         lineNr: 'Normal',
    \         word: 'Search',
    \       },
    \       removeCommentsFromResults: v:true,
    \     },
    \   },
    \   sourceParams: #{
    \     anyjump_reference: #{
    \       highlights: #{
    \         path: 'Normal',
    \         lineNr: 'Normal',
    \         word: 'Search',
    \       },
    \       removeCommentsFromResults: v:true,
    \       onlyCurrentFiletype: v:false,
    \     },
    \   },
    \ })
```

How to use:

```vim
call ddu#start(#{
    \ ui: 'ff',
    \ sources: [#{
    \   name: 'anyjump_definition',
    \ }]
    \ })

call ddu#start(#{
    \ ui: 'ff',
    \ sources: [#{
    \   name: 'anyjump_reference',
    \ }]
    \ })
```

## Params 

### `anyjump_definition`

- `highlights` 

Highlight groups for path, lineNr and search word.

Default: "Normal" for path and lineNr.
Default: "Search" for word.
- `removeCommentsFromResults` 

Remove comments line from search results.

Default: `true`

### `anyjump_reference`

- `highlights` 

see [ddu-source-anyjump_definition-param-highlights](ddu-source-anyjump_definition-param-highlights).
- `removeCommentsFromResults` 

see [ddu-source-anyjump_definition-param-removeCommentsFromResults](ddu-source-anyjump_definition-param-removeCommentsFromResults).
- `onlyCurrentFiletype` 

Search references only for current file type.

Default: `false`

