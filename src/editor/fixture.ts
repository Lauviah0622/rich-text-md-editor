import type { Descendant } from 'slate'

export const SLATE: Descendant[] = [
  {
    type: 'heading',
    depth: 1,
    children: [
      {
        text: 'h1 Heading 8-)',
      },
    ],
  },
  {
    type: 'heading',
    depth: 2,
    children: [
      {
        text: 'h2 Heading',
      },
    ],
  },
  {
    type: 'heading',
    depth: 3,
    children: [
      {
        text: 'h3 Heading',
      },
    ],
  },
  {
    type: 'heading',
    depth: 4,
    children: [
      {
        text: 'h4 Heading',
      },
    ],
  },
  {
    type: 'heading',
    depth: 5,
    children: [
      {
        text: 'h5 Heading',
      },
    ],
  },
  {
    type: 'heading',
    depth: 6,
    children: [
      {
        text: 'h6 Heading',
      },
    ],
  },
  {
    type: 'heading',
    depth: 2,
    children: [
      {
        text: 'Literal',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is bold text',
        bold: true,
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is bold text',
        bold: true,
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is italic text',
        emphasis: true,
        bold: true,
      },
      {
        text: '\n',
      },
      {
        text: '123123',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is italic text',
        emphasis: true,
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '123123123',
        code: true,
      },
    ],
  },
  {
    type: 'thematic-break',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'heading',
    depth: 2,
    children: [
      {
        text: 'Links',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'link',
        url: 'http://dev.nodeca.com',
        children: [
          {
            text: 'link text',
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'link',
        url: 'http://dev.nodeca.com',
        children: [
          {
            text: 'link text',
            bold: true,
            emphasis: true,
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'link',
        url: 'http://nodeca.github.io/pica/demo/',
        children: [
          {
            text: 'link with title',
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Autoconverted link https://github.com/nodeca/pica (enable linkify to see)',
      },
    ],
  },
  {
    type: 'heading',
    depth: 2,
    children: [
      {
        text: 'Images',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        url: 'https://octodex.github.com/images/minion.png',
        alt: 'Minion',
      },
      {
        text: '\n',
      },
      {
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        url: 'https://octodex.github.com/images/stormtroopocat.jpg',
        alt: 'Stormtroopocat',
        title: 'The Stormtroopocat',
      },
    ],
  },
  {
    type: 'heading',
    depth: 2,
    children: [
      {
        text: 'Blockquotes',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Blockquotes can also be nested...',
          },
        ],
      },
      {
        type: 'block-quote',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: '...by using additional greater-than signs right next to each other...',
              },
            ],
          },
          {
            type: 'block-quote',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: '...or with spaces between arrows.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'heading',
    depth: 2,
    children: [
      {
        text: 'Lists',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Unordered',
      },
    ],
  },

  {
    type: 'list',
    spread: false,
    ordered: false,
    children: [
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Create a list by starting a line with ',
              },
              {
                text: '+',
                code: true,
              },
              {
                text: ', ',
              },
              {
                text: '-',
                code: true,
              },
              {
                text: ', or ',
              },
              {
                text: '*',
                code: true,
              },
            ],
          },
        ],
      },
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Sub-lists are made by indenting 2 spaces:',
              },
            ],
          },
          {
            type: 'list',
            spread: false,
            ordered: true,
            children: [
              {
                type: 'list-item',
                spread: false,
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Marker character change forces new list start:',
                      },
                    ],
                  },
                  {
                    type: 'list',
                    spread: false,
                    ordered: false,
                    children: [
                      {
                        type: 'list-item',
                        spread: false,
                        children: [
                          {
                            type: 'paragraph',
                            children: [
                              {
                                text: 'Ac tristique libero volutpat at',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'list-item',
                        spread: false,
                        children: [
                          {
                            type: 'paragraph',
                            children: [
                              {
                                text: 'Ac tristique libero volutpat at',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'list',
                    spread: false,
                    ordered: true,
                    children: [
                      {
                        type: 'list-item',
                        spread: false,
                        children: [
                          {
                            type: 'paragraph',
                            children: [
                              {
                                text: 'Facilisis in pretium nisl aliquet',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'list',
                    spread: false,
                    ordered: true,
                    children: [
                      {
                        type: 'list-item',
                        spread: false,
                        children: [
                          {
                            type: 'paragraph',
                            children: [
                              {
                                text: 'Nulla volutpat aliquam velit',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Very easy!',
              },
            ],
          },
        ],
      },
    ],
  },
  /**
  {
    type: 'paragraph',
    children: [
      {
        text: 'Ordered',
      },
    ],
  },
  {
    type: 'list',
    spread: false,
    ordered: true,
    start: 1,
    children: [
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Lorem ipsum dolor sit amet',
              },
            ],
          },
        ],
      },
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Consectetur adipiscing elit',
              },
            ],
          },
        ],
      },
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Integer molestie lorem at massa',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'box list',
      },
    ],
  },
  {
    type: 'list',
    spread: false,
    ordered: false,
    children: [
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: '[x] checked',
              },
            ],
          },
        ],
      },
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: '[/] half',
              },
            ],
          },
        ],
      },
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: '[ ] test',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'list',
    spread: false,
    ordered: true,
    start: 1,
    children: [
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: '[ ] test',
              },
            ],
          },
        ],
      },
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: '[ ] test',
              },
            ],
          },
        ],
      },
      {
        type: 'list-item',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: '[ ] test',
              },
            ],
          },
        ],
      },
    ],
  },
 */
  {
    type: 'heading',
    depth: 2,
    children: [
      {
        text: 'Code',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Block code "fences"',
      },
    ],
  },
  {
    type: 'code',
    children: [
      {
        text: '\ntestset\nsetset\ntset\n\n',
      },
    ],
  },
  {
    type: 'heading',
    depth: 2,
    children: [
      {
        text: 'Jsx',
      },
    ],
  },
  {
    type: 'mdxJsxFlowElement',
    element: {
      name: 'Text',
      attributes: [],
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'werewrwerwer\nwerwer',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'werwer',
            },
          ],
        },
        {
          type: 'list',
          spread: false,
          ordered: false,
          children: [
            {
              type: 'list-item',
              spread: false,
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: '123123',
                    },
                  ],
                },
              ],
            },
            {
              type: 'list-item',
              spread: false,
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: '1231232',
                    },
                  ],
                },
              ],
            },
            {
              type: 'list-item',
              spread: false,
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: '123123',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'wer',
            },
          ],
        },
      ],
    },
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'mdxJsxTextElement',
        element: {
          name: 'Text',
          attributes: [],
          children: [
            {
              text: 'werewrw',
            },
            {
              text: 'erw',
              bold: true,
            },
            {
              text: 'er',
            },
          ],
        },
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  {
    type: 'mdxJsxFlowElement',
    element: {
      name: 'Text',
      attributes: [],
      children: [],
    },
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '2131',
      },
      {
        type: 'mdxJsxTextElement',
        element: {
          name: 'Text',
          attributes: [],
          children: [],
        },
        children: [
          {
            text: '',
          },
        ],
      },
      {
        text: '123123',
      },
    ],
  },
]

export const MARKDOWN = `
import { Text } from './Text.jsx'


# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Literal


**This is bold text**

__This is bold text__

***This is italic text***  
123123

_This is italic text_

\`123123123\`

---

## Links

[link text](http://dev.nodeca.com)

**[*link text*](http://dev.nodeca.com)**

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")



## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.



## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
        - Ac tristique libero volutpat at
        - Facilisis in pretium nisl aliquet
        - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Create a list by starting a line with \`+\`, \`-\`, or \`*\`
2. Sub-lists are made by indenting 2 spaces:
  3. Marker character change forces new list start:
    1. Ac tristique libero volutpat at
    2. Facilisis in pretium nisl aliquet
    3. Nulla volutpat aliquam velit
1. Very easy!


## Code
Block code "fences"

\`\`\`

testset
setset
tset


\`\`\`

## Jsx

<Text index={213} value="r123" obj={{name: "text"}}>
  werewrwerwer
  werwer


  werwer

  - 123123
  - 1231232
  - 123123

  wer
</Text>

<Text>werewrw**erw**er</Text>

<Text/>

2131<Text/>123123

`
/**
 * TODO
 * - 能夠把上面這兩個 tree 都轉換成 markdown
 * - 上面這兩個 tree 都可以改變內容
 *
 */

export const MARKDOWN_TEXT = `
import { SlButton } from '@shoelace-style/shoelace/dist/react/index.js'

<SlButton client:only="react">123123123</SlButton>
`

export const SPREAD = `

import { Text } from './Text.jsx'

## Jsx

<Text index={213} value="r123" obj={{name: "text"}}>
  werewrwerwer
  werwer


  werwer

  - 123123
  - 1231232
  - 123123

  wer
</Text>

<Text>werewrw**erw**er</Text>

<Text/>

2131<Text/>123123
`

export const INIT = [
  {
    type: 'heading',
    depth: 2,
    children: [
      {
        text: 'Jsx',
      },
    ],
  },
  {
    type: 'mdxJsxFlowElement',
    element: {
      name: 'Text',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'index',
          value: {
            type: 'mdxJsxAttributeValueExpression',
            value: '213',
            data: {
              estree: {
                type: 'Program',
                start: 58,
                end: 61,
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Literal',
                      start: 58,
                      end: 61,
                      loc: {
                        start: {
                          line: 7,
                          column: 13,
                          offset: 58,
                        },
                        end: {
                          line: 7,
                          column: 16,
                          offset: 61,
                        },
                      },
                      value: 213,
                      raw: '213',
                      range: [
                        58,
                        61,
                      ],
                    },
                    start: 58,
                    end: 61,
                    loc: {
                      start: {
                        line: 7,
                        column: 13,
                        offset: 58,
                      },
                      end: {
                        line: 7,
                        column: 16,
                        offset: 61,
                      },
                    },
                    range: [
                      58,
                      61,
                    ],
                  },
                ],
                sourceType: 'module',
                comments: [],
                loc: {
                  start: {
                    line: 7,
                    column: 13,
                    offset: 58,
                  },
                  end: {
                    line: 7,
                    column: 16,
                    offset: 61,
                  },
                },
                range: [
                  58,
                  61,
                ],
              },
            },
          },
        },
        {
          type: 'mdxJsxAttribute',
          name: 'value',
          value: 'r123',
        },
        {
          type: 'mdxJsxAttribute',
          name: 'obj',
          value: {
            type: 'mdxJsxAttributeValueExpression',
            value: '{name: "text"}',
            data: {
              estree: {
                type: 'Program',
                start: 81,
                end: 95,
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ObjectExpression',
                      start: 81,
                      end: 95,
                      loc: {
                        start: {
                          line: 7,
                          column: 36,
                          offset: 81,
                        },
                        end: {
                          line: 7,
                          column: 50,
                          offset: 95,
                        },
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 82,
                          end: 94,
                          loc: {
                            start: {
                              line: 7,
                              column: 37,
                              offset: 82,
                            },
                            end: {
                              line: 7,
                              column: 49,
                              offset: 94,
                            },
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 82,
                            end: 86,
                            loc: {
                              start: {
                                line: 7,
                                column: 37,
                                offset: 82,
                              },
                              end: {
                                line: 7,
                                column: 41,
                                offset: 86,
                              },
                            },
                            name: 'name',
                            range: [
                              82,
                              86,
                            ],
                          },
                          value: {
                            type: 'Literal',
                            start: 88,
                            end: 94,
                            loc: {
                              start: {
                                line: 7,
                                column: 43,
                                offset: 88,
                              },
                              end: {
                                line: 7,
                                column: 49,
                                offset: 94,
                              },
                            },
                            value: 'text',
                            raw: '"text"',
                            range: [
                              88,
                              94,
                            ],
                          },
                          kind: 'init',
                          range: [
                            82,
                            94,
                          ],
                        },
                      ],
                      range: [
                        81,
                        95,
                      ],
                    },
                    start: 81,
                    end: 95,
                    loc: {
                      start: {
                        line: 7,
                        column: 36,
                        offset: 81,
                      },
                      end: {
                        line: 7,
                        column: 50,
                        offset: 95,
                      },
                    },
                    range: [
                      81,
                      95,
                    ],
                  },
                ],
                sourceType: 'module',
                comments: [],
                loc: {
                  start: {
                    line: 7,
                    column: 36,
                    offset: 81,
                  },
                  end: {
                    line: 7,
                    column: 50,
                    offset: 95,
                  },
                },
                range: [
                  81,
                  95,
                ],
              },
            },
          },
        },
      ],
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'werewrwerwer\nwerwer',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'werwer',
            },
          ],
        },
        {
          type: 'list',
          spread: false,
          ordered: false,
          children: [
            {
              type: 'list-item',
              spread: false,
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: '123123',
                    },
                  ],
                },
              ],
            },
            {
              type: 'list-item',
              spread: false,
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: '1231232',
                    },
                  ],
                },
              ],
            },
            {
              type: 'list-item',
              spread: false,
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: '123123',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'wer',
            },
          ],
        },
      ],
    },
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'mdxJsxTextElement',
        element: {
          name: 'Text',
          attributes: [],
          children: [
            {
              text: 'werewrw',
            },
            {
              text: 'erw',
              bold: true,
            },
            {
              text: 'er',
            },
          ],
        },
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  {
    type: 'mdxJsxFlowElement',
    element: {
      name: 'Text',
      attributes: [],
      children: [],
    },
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '2131',
      },
      {
        type: 'mdxJsxTextElement',
        element: {
          name: 'Text',
          attributes: [],
          children: [],
        },
        children: [
          {
            text: '',
          },
        ],
      },
      {
        text: '123123',
      },
    ],
  },
]

export const CONTEXT = {
  modules: {
    './Text.jsx': {
      components: [
        'Text',
      ],
      path: './Text.jsx',
    },
  },
  components: {
    Text: {
      components: [
        'Text',
      ],
      path: './Text.jsx',
    },
  },
}

export const SIMPLE: Descendant[] = [

  {
    type: 'heading',
    depth: 1,
    children: [
      {
        text: 'Create a list by starting a line with ',
      },
      {
        text: '+',
        code: true,
      },
      {
        text: ', ',
      },
      {
        text: '-',
        code: true,
      },
      {
        text: ', or ',
      },
      {
        text: '*',
        code: true,
      },
    ],
  },
  {

    type: 'block-quote',
    children: [
      {

        type: 'block-quote',
        children: [
          {

            type: 'block-quote',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Create a list by starting a line with ',
                  },
                ],
              },
            ],
          },
          {

            type: 'block-quote',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Create a list by starting a line with ',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Create a list by starting a line with ',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Create a list ' },
      {
        type: 'link',
        url: '213',
        children: [
          { text: 'Create a list b' },
        ],
      },
      { text: 'Create a list ' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Create a list by starting a line with ',
      },
      {
        text: '+',
        code: true,
      },
      {
        text: ', ',
      },
      {
        text: '-',
        code: true,
      },
      {
        text: ', or ',
      },
      {
        text: '*',
        code: true,
      },
    ],
  },

]

export const TEST_UNWRAP_TO_TEXT: Descendant[] = [{

  type: 'block-quote',
  children: [

    {

      type: 'block-quote',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'line 1',
            },
          ],
        },
        {

          type: 'block-quote',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'line 2',
                },
              ],
            },
          ],
        },
        {

          type: 'block-quote',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'line 3',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'line 4',
        },
      ],
    },
  ],
}]
