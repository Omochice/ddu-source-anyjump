# ddu-source-anyjump

Source for non-LSP oriented definition|reference list.

Based on <https://github.com/pechorin/any-jump.vim>.

## Installation

Use your favorite plugin manager or other.

## Dependencies

ddu.vim and denops.vim are required.

- <https://github.com/Shougo/ddu.vim>
- <https://github.com/vim-denops/denops.vim>
- <https://github.com/BurntSushi/ripgrep>
- <https://github.com/Shougo/ddu-kind-file>

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

See the [help file](./doc/ddu-source-anyjump.txt) for more details.
